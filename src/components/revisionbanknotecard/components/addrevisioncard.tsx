

import { useEffect, useState,useRef } from "react";
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from 'axios'
import Select from "react-select";
import { useNavigate } from "react-router";
//import Tesseract from 'tesseract.js';
import "./addrevisioncard.css";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { Button } from "react-bootstrap";
import Jimp from "jimp";
import LoadingSpinner from "../../../animations/Loadingspinner";
import { useAlert } from 'react-alert'
import RevisionBankSpeechRecognition from "../../speechrecognition/speechrecognition";
import Resizer from "react-image-file-resizer"
import {useSpeechRecognition} from "react-speech-recognition"
import WebcamImage from "./WebCamImage";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReactCanvasPaint from 'react-canvas-paint';
import EditIcon from '@mui/icons-material/Edit';
import { CanvasdefaultProps } from "./drawingcanvas"
import CanvasDraw from "react-canvas-draw";
import DragHandleIcon from '@mui/icons-material/DragHandle';

//import 'react-canvas-paint/dist/index.css'
export default function AddRevisionCard(props:any){
    const { transcript, resetTranscript } = useSpeechRecognition();
    const canvasRef  = useRef<any>([]);
    //const [canvasheight, setCanvasHeight] = useState(0);
    //const [canvaswidth, setCanvasWeight] = useState(0)
    const [size, setSize] = useState([{ x: 400, y: 500 }])
    const canvasrefdim = useRef<any>(null)
    const reactalert = useAlert()
    const [submitting,setSubmitting] = useState<Boolean>(false)
    const navigate = useNavigate();
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    //const numoaccounts = 200 - props.numstudentaccounts
    const getdigitregex = /\d+/g;
    //const revisionscheduleintervalselect = [{"label":"60 minutes","value":0},{"label":"30 minutes","value":1}]//,{"label":"30 minutes","value":1}]
    const [revisionscheduleinterval,setRevisionScheduleInterval] = useState<any>("")
    const [studentemailstored,setStudentEmailStored] = useState(false)
    const [emptyfield,setEmptyField] = useState(false)
    const [selectalloptions,setSelectAllOptions] = useState(false)
    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    const [ocrrecogloading,setOcrRecogLoading] = useState<any>([{ocrloading:false}])
    const [ocrprogress,setOCRProgress] = useState<any>([{ocrprogress:0}])
    const [ocrfilename,setOCRFilename] = useState([{filename:''}])
    const [showComponent,setShowComponent] = useState(false)
    //const [speechtranscript,setSpeechTranscript] = useState("")
    const [showCanvas,setShowCanvas] = useState(false)
    const [formFields, setFormFields] = useState([
        { subject: '',revisioncardtitle:'',revisioncard:'',translation:'',drawing:''},
        ])

	const [fileisnottxt,setFileisNotTxt] = useState(false);
    const [revisioncardimage,setRevisionCardImage] = useState([{revisioncardimgname:[],revisioncardimage:[]}])
    const [toomanyimages,setTooManyImages] = useState(false)
    const [showWebcam,setShowWebCam] = useState(false)
    const resizeFile = (file:any) => new Promise(resolve =>{
        Resizer.imageFileResizer(file,700,700,"JPEG",100,0,uri=>{resolve(uri);},'base64')
    })
    const submitCanvas:any = (canvas:any,index:any) => {
        const image=  canvas.getDataURL()
        //console.log(image)

        const revisioncardimagename = `canvas${revisioncardimage[index]["revisioncardimage"].length}` +".png" //${image.replace("data:image/png;base64,","").slice(0,10)}
        let ocrfilenamedata:any = [...ocrfilename];
        ocrfilenamedata[index]["filename"] = revisioncardimagename;
        setOCRFilename(ocrfilenamedata);

        let ocrrecogloadingdata:any = [...ocrfilename];
        ocrrecogloadingdata[index]["ocrloading"] = true;
        setOcrRecogLoading(ocrrecogloadingdata);
        
        let data:any = [...revisioncardimage];

        
        data[index]["revisioncardimgname"].push(revisioncardimagename);
        data[index]["revisioncardimage"].push(image);
        // console.log(data)
        //if (data.)
        
        if (revisioncardimage[index].revisioncardimgname.length <= 4){
            let dataform:any = [...formFields];
            dataform[index]["drawing"] = `false`;
            setFormFields(dataform);
            setRevisionCardImage(data);
            
        }
        else if (revisioncardimage[index].revisioncardimgname.length > 4){
            revisioncardimage[index].revisioncardimgname.pop()
            revisioncardimage[index].revisioncardimage.pop()
            reactalert.show("Maximum 4 images in cards.")
        }
        //console.log()
    }
    const handler = (mouseDownEvent:any,index:number) => {
        const sizedata = [...size]
        const startPosition = { x: mouseDownEvent.pageX, y: mouseDownEvent.pageY };
        
        function onMouseMove(mouseMoveEvent:any) {
            console.log(sizedata[index].y - startPosition.y + mouseMoveEvent.pageY )
            sizedata[index]["x"] = canvasrefdim.current.clientWidth 
            sizedata[index]["y"] = sizedata[index].y - startPosition.y + mouseMoveEvent.pageY 
            console.log(sizedata,":end")
            setSize(sizedata)

          /*setSize(currentSize => ({ 
            x:canvasrefdim.current.clientWidth ,//startSize.x - startPosition.x + mouseMoveEvent.pageX 
            y: startSize.y - startPosition.y + mouseMoveEvent.pageY 
          }));*/
        }
        function onMouseUp() {
          document.body.removeEventListener("mousemove", onMouseMove);
          // uncomment the following line if not using `{ once: true }`
          // document.body.removeEventListener("mouseup", onMouseUp);
        }
        
        document.body.addEventListener("mousemove", onMouseMove);
        document.body.addEventListener("mouseup", onMouseUp, { once: true });
      };
    
    const handleFormChange = async (event:any, index:any,speecrecog=false) => {
        // console.log(speecrecog)
        if (speecrecog === false){
        if (event.target.files){
            const reader = new FileReader()
            if (event.target.files[0].name.includes(".txt")){
                
                reader.onload = async (e:any) => {
                    const text = (e.target.result)
                    let data:any = [...formFields];
                    data[index][event.target.name] = text;
                    setFormFields(data);
                    //console.log(text)
                    //alert(text)
                }
                reader.readAsText(event.target.files[0])
                
            }
            else if (event.target.files[0].name.includes(".png") || event.target.files[0].name.includes(".PNG") || event.target.files[0].name.includes(".gif") ) {
               
                let ocrfilenamedata:any = [...ocrfilename];
                ocrfilenamedata[index]["filename"] = event.target.files[0].name;
                setOCRFilename(ocrfilenamedata);

                let ocrrecogloadingdata:any = [...ocrfilename];
                ocrrecogloadingdata[index]["ocrloading"] = true;
                setOcrRecogLoading(ocrrecogloadingdata);
                
                const reader=new FileReader();
                reader.onload=(tessevent:any)=>{
                const image= tessevent.target.result;
                //console.log(image)
                const revisioncardimagename = event.target.files[0].name
                let data:any = [...revisioncardimage];

                
                data[index]["revisioncardimgname"].push(revisioncardimagename);
                data[index]["revisioncardimage"].push(image);
                //console.log(data.length)
                //if (data.)
                
                if (revisioncardimage[index].revisioncardimgname.length <= 4){
                    setRevisionCardImage(data);
                }
                else if (revisioncardimage[index].revisioncardimgname.length > 4){
                    revisioncardimage[index].revisioncardimgname.pop()
                    revisioncardimage[index].revisioncardimage.pop()
                    reactalert.show("Maximum 4 images in cards.")
                }
            }
                reader.readAsDataURL(event.target.files[0]);
            }
            // images
            else if (event.target.files[0].name.includes(".jpg") || event.target.files[0].name.includes(".jpeg")){
                let ocrfilenamedata:any = [...ocrfilename];
                ocrfilenamedata[index]["filename"] = event.target.files[0].name;
                setOCRFilename(ocrfilenamedata);

                let ocrrecogloadingdata:any = [...ocrfilename];
                ocrrecogloadingdata[index]["ocrloading"] = true;
                setOcrRecogLoading(ocrrecogloadingdata);
                const image = await resizeFile(event.target.files[0])
                //console.log(image)
                const revisioncardimagename = event.target.files[0].name
                let data:any = [...revisioncardimage];

                
                data[index]["revisioncardimgname"].push(revisioncardimagename);
                data[index]["revisioncardimage"].push(image);
                //console.log(data.length)
                //if (data.)
                
                if (revisioncardimage[index].revisioncardimgname.length <= 3){
                    setRevisionCardImage(data);
                }
                else if (revisioncardimage[index].revisioncardimgname.length > 3){
                    revisioncardimage[index].revisioncardimgname.pop()
                    revisioncardimage[index].revisioncardimage.pop()
                    reactalert.show("Maximum 3 image in cards.")
                }
                
                /*const reader=new FileReader();
                reader.onload=(tessevent:any)=>{
                const image= tessevent.target.result;
                const revisioncardimagename = event.target.files[0].name
                let data:any = [...revisioncardimage];

                
                data[index]["revisioncardimgname"].push(revisioncardimagename);
                data[index]["revisioncardimage"].push(image);
                //console.log(data.length)
                //if (data.)
                
                if (revisioncardimage[index].revisioncardimgname.length <= 1){
                    setRevisionCardImage(data);
                }
                else if (revisioncardimage[index].revisioncardimgname.length > 1){
                    revisioncardimage[index].revisioncardimgname.pop()
                    revisioncardimage[index].revisioncardimage.pop()
                    reactalert.show("Maximum 1 image in cards.")
                }
            }
                reader.readAsDataURL(event.target.files[0]);*/

            }
            
            else{
                setFileisNotTxt(true)
            }

        }
        else{
            let data:any = [...formFields];
            
            data[index][event.target.name] = event.target.value;
            setFormFields(data);
        }}
        else if (speecrecog === true){
           
            let data:any = [...formFields];
            data[index]["revisioncard"] = `${data[index]["revisioncard"]} ${event}`;
            setFormFields(data);
        }

    }
    const handleFormChangeHand = (event:any) => {
        //const tessresponse = axios.post("https://revisionbanktensorflow.herokuapp.com/revisionbankhandtranslate",{"img":image}).then(response=>{})
    }
    const handlecreateDraw = (index:any) => {
        let data:any = [...formFields];
        data[index]["drawing"] = `true`;
        setFormFields(data);


    }
    //console.log(revisionscheduleinterval)
    const submitRevisionCard = async (e:any) => {
        setSelectAllOptions(false)
        //e.preventDefault();
        setSubmitting(true)
        //console.log(revisionscheduleinterval.label)
        formFields.map((revisioncard:any) => {delete revisioncard["drawing"]})
        const checkformfields:any = formFields.map((revisioncard:any) => { if (revisioncard.subject === '' || revisioncard.revisioncardtitle === '' || revisioncard.revisioncard === ''){return("true")}else{return("false")} })
        const checkrevisioncardimages:any = revisioncardimage.map((revisioncard:any) => { if (revisioncard.revisioncardimgname.length === 0 || revisioncard.revisioncardimage === 0){return("true")}else{return("false")} })
        //console.log(checkformfields)
        //console.log(checkformfields)
        if ((checkformfields.includes("true") && checkrevisioncardimages.includes("true")) || (email  === '' || props.emailcount === 0 ) || (checkformfields.length === 0 && checkrevisioncardimages.length === 0)|| revisionscheduleinterval === ""){
            setSubmitting(false)
            setStudentEmailStored(false)
            setSelectAllOptions(true)
        }
        else if (!(checkformfields.includes("true") && checkrevisioncardimages.includes("true")) && email !== '' && revisionscheduleinterval !== ""){
            var config = {headers: {Authorization: `Bearer ${props.token.token}`,}}
            // TODO Store the image in the database here using post request
            revisioncardimage.map((val,ind) => {Object.assign(formFields[ind],val)})
            formFields.map((card:any)=> {card["revisionscheduleinterval"] = parseInt(revisionscheduleinterval)})
            var json = {"revisioncardscheduler":{"sendtoemail":email,"revisionscheduleinterval":parseInt(revisionscheduleinterval),"revisioncards":formFields}} // parseInt(revisionscheduleinterval.label.match(getdigitregex)[0])
            
            const response = await axios.post("https://revisionbankbackend-aoz2m6et2a-uc.a.run.app/storerevisioncards",json,config)
            //console.log(response.data)
            setSubmitting(false)
            //window.location.reload();
            navigate('/revisioncards',{state:{"token":props.token.token}})
        } 
        
    
        
    }
    
    const addFields = () => {
        let object = {
            subject: '',
            revisioncardtitle:'',
            revisioncard:'',
            translation:'',
            drawing:''
        }
        // reset trasncript here
        resetTranscript()
        setFormFields([...formFields, object])
        
        let ocrloadingobject = {
            ocrloading:false
        }
        setOcrRecogLoading([...ocrrecogloading, ocrloadingobject])
        let ocrprogressobject = {
            ocrprogress:0
        }
        setOCRProgress([...ocrprogress, ocrprogressobject])
        let ocrfilenameobject = {
            filename:''
        }
        setOCRFilename([...ocrfilename, ocrfilenameobject])
        let revisioncardimageobject = {revisioncardimgname:[],revisioncardimage:[]}
        //console.log([...revisioncardimage])
        setRevisionCardImage([...revisioncardimage,revisioncardimageobject])
        let sizeobject = { x: 400, y: 300 }
        setSize([...size,sizeobject])
        
        }

    
    
        const removeFields = (index:any) => {
        resetTranscript()
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
        let ocrloadingdata = [...ocrrecogloading];
        ocrloadingdata.splice(index, 1)
        setOcrRecogLoading(ocrloadingdata)
        let ocrprogressdata = [...ocrprogress];
        ocrprogressdata.splice(index, 1)
        setOCRProgress(ocrprogressdata)
        let ocrfilenamedata = [...ocrfilename];
        ocrfilenamedata.splice(index, 1)
        setOCRFilename(ocrfilenamedata)
        let revisioncardimagedata = [...revisioncardimage];
        revisioncardimagedata.splice(index,1)
        setRevisionCardImage(revisioncardimagedata)
        let sizedata = [...size]
        sizedata.splice(index,1)
        setSize(sizedata)
        
        //props.setAccountInfo((accountinfo:any)=> ({...props.accountinfo,numofaccounts:props.accountinfo.numofaccounts+1}))
        }
    //<UploadFileIcon style={{fontSize:"20px"}}/>
    function onDrawChange(imagedata:any){
        //const blob = new Blob(imagedata.data)
        const uint8ToBase64 = (arr: Uint8Array): string =>
        btoa(
            Array(arr.length)
                .fill('')
                .map((_, i) => String.fromCharCode(arr[i]))
                .join('')
        );
    
    // For Node.js
            const uint8ToBase64val = (imagedata: Uint8Array): string => Buffer.from(imagedata).toString('base64');
           
          // Usage
          //var u8 = new Uint8Array([65, 66, 67, 68]);
        // var b64encoded = btoa(Uint8ToString(imagedata.data));
        console.log( uint8ToBase64(imagedata))
        //console.log(imagedata.data)
    

    }
    useEffect(() => {
        if (canvasrefdim.current !== null){
            /*setSize(currentSize => ({ 
                x: canvasrefdim.current.clientWidth, 
                y: canvasrefdim.current.clientHeight
              }));*/
              const sizedata = [...size];
              formFields.map((data,index) => {
                
                sizedata[index]["x"] = canvasrefdim.current.clientWidth; 
                sizedata[index]["y"] = canvasrefdim.current.clientHeight;
                setSize(sizedata)
              } )
 
            //setCanvasHeight(canvasrefdim.current.clientHeight)
           // setCanvasWeight(canvasrefdim.current.clientWidth)
        }

      },[formFields])
    //console.log(speechtranscript,"hi")
    return(
        <div>
            <div style={{margin:"20px"}}>
                

                <form onSubmit={submitRevisionCard}>
                    {props.showemailprompt &&
                    <input
                        
                            name='email'
                            placeholder='Email to send to'
                            onChange={(e:any) => {setEmail(e.target.value);setEmailIsSet(true)}}
                            value={email}
                        />
                    }
                    
                    {formFields.map((form, index) => {

                    //console.log(formFields)
                    //console.log(ocrprogress[index]["ocrprogress"])
                    
                    return (
                        <div>
                            <div key={index} style={{display:"flex",flexDirection:maxRowBased ? "column" :"column",marginTop:"10px"}}>
                            <input
                                style={{"marginBottom":"10px"}}
                                name='subject'
                                placeholder='Subject'
                                onChange={event => handleFormChange(event, index)}
                                value={form.subject}
                            />
                            <input
                                style={{"marginBottom":"10px"}}
                                name='revisioncardtitle'
                                placeholder='Revision card title'
                                onChange={event => handleFormChange(event, index)}
                                value={form.revisioncardtitle}
                            />
                            {/*index === 0 && <Select options={revisionscheduleintervalselect} value={revisionscheduleintervalselect.find((obj:any) => obj.value === revisionscheduleinterval)} onChange= {(e:any) => {setRevisionScheduleInterval(e);}}  ></Select>*/}

                            {index === 0 && <input placeholder="Time Interval" min="1" type="number" value={revisionscheduleinterval} onChange= {(e:any) => {setRevisionScheduleInterval(e.target.value)}}  ></input>}
                            
                            <textarea name="revisioncard" defaultValue={formFields[index]["revisioncard"]} className="form-control" style={{height: "200px",width:"100%"}} onChange={event => handleFormChange(event, index)}>
                            </textarea>

                        
                            </div>
                            <div style={{display:"flex",marginTop:"10px"}}>
                                <label className="label">
                                <input className="uploadfile" type="file" name="revisioncard" accept=".txt,text/html,text/plain,.png,.jpg,.jpeg,.gif"  onChange={event => handleFormChange(event, index)} />
                                <span style={{width:"100px",border:"1px solid #fa0095",borderRadius:"10px",backgroundColor:"#fa0095",padding:"10px",color:"white"}}>Upload txt/png </span>
                                </label>
                                { showComponent === true && 
                                <label className="label">
                                <input type="file" name="revisioncard" accept=".png,.jpg,.jpeg"  onChange={event => handleFormChange(event, index,false)} />
                                <span >Upload Handwriting</span>
                                </label>
                                }
                                <button style={{width:"100px",border:"1px solid red",borderRadius:"10px",backgroundColor:"red",padding:"5px",color:"white"}} id="upload" onClick={() => removeFields(index)}>Remove</button>
                            </div>
                            {ocrfilename[index]["filename"] !== ""  ?<div>
                            <table>
                                <tbody >
                                <tr>
                                {revisioncardimage[index]["revisioncardimgname"].map((val)=> {return(<th key={val} style={{textAlign:"left"}}>{val}</th>)})}
                                </tr>
                                <tr>
                                {revisioncardimage[index]["revisioncardimage"].map((val)=> {return(<td ><img key={val} style={{width:maxRowBased ? "55%": "75%" ,height: maxRowBased ? "55%" : "75%"}} src={val}></img></td>)})}
                                </tr>
                                </tbody>
                            </table>
                            </div>: <p></p>}

                            {formFields[index]["drawing"] === "true" &&
                            <div ref={canvasrefdim} style={{display:"flex",marginTop:"10px",flexDirection:"column",border:"1px solid black",height: size[index].y-1,width:"100%"}}>
                            {/*<ReactCanvasPaint onDraw={(e:any) => {onDrawChange(e)}}  />*/}
                            {/*ref={canvasRef}  */}
                            {size[index].y !== 0 &&
                            <div >
                            <CanvasDraw key={index} ref={(el:any) => (canvasRef.current[index] = el)} brushRadius={2} hideInterface={true} canvasHeight={size[index].y-2.5} canvasWidth={size[index].x -2.5} />
                            </div>
                            }
                            {/*<DragHandleIcon sx={{fontSize:20}} style={{marginLeft:"auto"}}  id="draghandle" type="button" onMouseDown={(e:any) => {handler(e,index)}}></DragHandleIcon> */}

                            </div>} 
                            {ocrprogress[index]["ocrprogress"] >  0 && ocrprogress[index]["ocrprogress"] <  100 &&<div >Loading text image: {ocrprogress[index]["ocrprogress"]}%</div>}
                            <div style={{display:"flex",flexDirection:showWebcam === true ? "column":"row",marginTop:formFields[index]["drawing"] === "true" ? "20px": "0px"}}>
                                <RevisionBankSpeechRecognition resetTranscript={resetTranscript} transcript={transcript} setFormFields={setFormFields} formFields={formFields} handleFormChange={handleFormChange} index={index}></RevisionBankSpeechRecognition>
                                {showWebcam === true ? 
                                <WebcamImage setShowWebCam={setShowWebCam} setFormFields={setFormFields} formFields={formFields} handleFormChange={handleFormChange} index={index} marginLeft={{marginLeft:"auto"}} /> :
                                <CameraAltIcon style={{position:"relative",top:"12px",left:"10px",fontSize:"15px","width":"50px","height":"50px"}} onClick={() => {setShowWebCam(true)}}/>
                                }
                                <EditIcon  onClick={() => {handlecreateDraw(index)}} style={{position:"relative",top:"10px",left:"14px",fontSize:"15px","width":"50px","height":"50px",color:"black"}} />
                                {formFields[index]["drawing"] === "true" &&
                                <div style={{display:"flex",gap:"10px",flexDirection:maxRowBased ? "row":"column"}}>
                                <Button key={index} onClick={(event) =>{submitCanvas(canvasRef.current[index],index)} } style={{position:"relative",top:"10px",left:"14px",fontSize:"13px"}}>Submit Canvas</Button>
                                <Button key={index} onClick={(event) =>{let data:any = [...formFields];data[index]["drawing"] = `false`;setFormFields(data);} } style={{position:"relative",top:"10px",left:"14px",fontSize:"13px",backgroundColor:"red",border:"1px solid red"}}>Remove Canvas</Button>
                                
                                </div>}
                            </div>

                        </div>
                    )
                    })}
                </form>
                <div style={{display:"flex",flexDirection:"row",gap:"1%",marginTop:"10px"}}>
                    {submitting ? <LoadingSpinner></LoadingSpinner> : <button style={{width:"100px",borderRadius:"10px",backgroundColor:"#335eea",padding:"5px",color:"white"}} onClick={submitRevisionCard}>Submit</button>}
                    <br/>
                    <button style={{marginLeft:"10px",width:"100px",borderRadius:"10px",backgroundColor:"green",padding:"5px",color:"white"}} onClick={addFields}>Add More...</button>
                    
                    
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                {studentemailstored && <p style={{color:"green"}}>Student emails stored.</p>}
                {selectalloptions && <p style={{color:"red"}}>Please fill in all fields.</p>}
                {toomanyimages && <p style={{color:"red"}}>Maximum 2 images.</p> }
            </div>
        </div>
                
    )
}


