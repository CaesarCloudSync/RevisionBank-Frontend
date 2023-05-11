import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from "axios";
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
const FACING_MODE_USER = "user";
const FACING_MODE_ENVIRONMENT = "environment";
//https://blog.openreplay.com/capture-real-time-images-and-videos-with-react-webcam/
const videoConstraints = {
  facingMode: FACING_MODE_USER
};
function WebcamImage(props:any) {

  const [img, setImg] = useState(null);
  const webcamRef:any = useRef(null);
  const maxRowBased = useMediaQuery(maxRowBasedquery);
  const [ocrresult,setOCRresult] = useState("")
  const [facingMode, setFacingMode] = React.useState(FACING_MODE_USER);
  const [backView,setBackView] = useState(true)
  //const [hideCamera,setHideCamera] = useState(false)

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };
  const AddOCR = () =>{
    let newtext = ocrresult//props.formFields[props.index]["revisioncard"] + ` ${ocrresult}`
    //console.log(newtext)
    props.handleFormChange(newtext,props.index,true)
  }
  const switchCamera = React.useCallback((e) => {
  
    e.preventDefault();
    setFacingMode(
      prevState =>
        prevState === FACING_MODE_USER
          ? FACING_MODE_ENVIRONMENT
          : FACING_MODE_USER
    );
    setBackView(false)

  }, []);

  const capture = useCallback(() => {

    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  async function submit(e:any){
    e.preventDefault()
    
    const response = await axios.post("https://palondomus-caesarai.hf.space/caesarocr",{"frame":img})
    //console.log(response.data)
    setOCRresult(response.data.message)
    //console.log(img)
  }
  const WebCamDim:any = maxRowBased ? [400,400] : [300,300]

  return (
    <div style={Object.assign({},props.marginLeft,{position:"relative",right:maxRowBased ? "60px" : "10px"})} className="Container">
    {img === null ? 
        <div style={{display:"flex",flexDirection:"column"}}>
          <div style={{display:"flex",marginTop: maxRowBased ?"0px" :"10px"}}>
          <button  onClick={submit}>Submit photo</button>
          <button style={{marginLeft:"auto"}} onClick={switchCamera}>Switch camera</button>
          
          
          
          </div>
        
          <Webcam
            audio={false}
            mirrored={backView}
            height={WebCamDim[0]}
            width={WebCamDim[1]}
            ref={webcamRef}
            style={{borderRadius:"10px"}}
            screenshotFormat="image/jpeg"
            videoConstraints={{
              ...videoConstraints,
              facingMode
            }}
          />
          

          
          {/*<button  onClick={(e) =>{e.preventDefault();capture()}}>Capture photo</button>*/}
          <div style={{display:"grid",justifyItems:"center"}}>
          <RadioButtonCheckedIcon style={{position:"relative",right:maxRowBased ?"0px": "10px",fontSize: 50 }} onClick={(e) =>{e.preventDefault();capture()}}></RadioButtonCheckedIcon>
          <button style={{marginLeft: "auto"}}  onClick={(e) =>{e.preventDefault();setImg(null);setOCRresult("");setBackView(true);setFacingMode(FACING_MODE_USER);props.setShowWebCam(false)}}>Stop Photo</button>
          </div>
          
          {ocrresult !== "" &&
          <div style={{display:"flex"}}>
          {ocrresult}
          <button style={{marginLeft:"auto"}} onClick={(e) =>{e.preventDefault();AddOCR()}}>Add To Card</button>
          


          </div>
          
}
          
          
        </div>
       : 
        <div style={{display:"flex",flexDirection:"column"}}>
            <div style={{display:"flex"}}>
            <button  onClick={submit}>Submit photo</button>
            <button style={{marginLeft:"auto"}} onClick={(e) => {e.preventDefault();setImg(null);setOCRresult("")}}>Retake</button>
            </div>
          <img style={{borderRadius:"10px"}} src={img} alt="screenshot" />
          {ocrresult !== "" &&
          <div style={{display:"flex"}}>
          {ocrresult}

          <button style={{marginLeft:"auto"}} onClick={(e) =>{e.preventDefault();props.handleFormChange(ocrresult,props.index,true)}}>Add To Card</button>
          
          </div>
}
        </div>
      }

    </div>
    )
}

export default WebcamImage;