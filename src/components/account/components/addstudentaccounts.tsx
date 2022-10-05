import { useEffect, useState } from "react";
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from 'axios'
import "./csvuploadstyle.css"
import UploadIcon from '@mui/icons-material/Upload';
import { Button } from "react-bootstrap";
export default function AddStudentAccounts(props:any){
    const [csvfilename,setCSVFilename] = useState("")
    const [showConfirm,setShowConfirm] = useState(false)
    const [studentchanged,setStudentChanged] = useState(false)
  
    const fileReader = new FileReader();
  
    const handleOnChange = (e:any) => {
        setCSVFilename(e.target.files[0].name)
        //setFile(e.target.files[0]);
        const file = e.target.files[0];
        if (file) {
            fileReader.onload = function (event:any) {
             
              const text = event.target.result;
              csvFileToArray(text);
            };
            fileReader.readAsText(file);
    };
}   
    const setStudentCSV = async (resultarray:any) => {
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
    var json = {hostemail:props.accountinfo.email,studentemails:resultarray,studentsubscription:`student ${props.accountinfo.subscription}`,studentemailsleft:20}
    const response = await axios.post(`https://revisionbankapi.herokuapp.com/setstudentsubscriptions`,json,config)
    const studentresponse:any = await axios.get(`https://revisionbankapi.herokuapp.com/getstudentsubscriptions`,config)
    props.setStudentAccountInfo(studentresponse.data.result)

  
  }
  
    const csvFileToArray = (string:string) => {

      const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
      const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");
  
      const array = csvRows.map(i => {
        const values = i.split(",");
        const obj = csvHeader.reduce((object:any, header, index) => {
          object[header] = values[index];
          return object;
        }, {});
        return obj;
      });
      //console.log(array)
      function toLowerKeys(obj:any) {
        return Object.keys(obj).reduce((accumulator:any, key:any) => {
          accumulator[key.toLowerCase().replace("\r","")] = obj[key] //.replace('"',"").replace("'","");
          return accumulator;
        }, {});
      }
    
      const resultarray = array.map((items:any) => {return(toLowerKeys(items))})
      setStudentCSV(resultarray)
    };
    
  

  
    const [submitting,setSubmitting] = useState<Boolean>(false)
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const numoaccounts = 200 - props.numstudentaccounts
    
    const [studentemailstored,setStudentEmailStored] = useState(false)
    const [emptyfield,setEmptyField] = useState(false)
    const [selectalloptions,setSelectAllOptions] = useState(false)
    const [studentexists,setStudentExists] = useState(false)
    const [formFields, setFormFields] = useState([
        { email: '', password: '' },
        ])
    
        const handleFormChange = (event:any, index:any) => {
        let data:any = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
        }
    
    const submitStudentSubscription = async (e:any) => {
        setStudentEmailStored(false)
        setStudentExists(false)
        setSelectAllOptions(false)
        e.preventDefault();
        setSubmitting(true)
        //console.log(formFields)
        const checkformfields:any = formFields.map((student:any) => { if (student.email === '' || student.password === ''){return("true")}else{return("false")} })
        //console.log(checkformfields)
        if (checkformfields.includes("true")){
            setSubmitting(false)
            setStudentEmailStored(false)
            setSelectAllOptions(true)
        }
        else if (!(checkformfields.includes("true"))){
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
            var json = {hostemail:props.accountinfo.email,studentemails:formFields,studentsubscription:`student ${props.accountinfo.subscription}`,studentemailsleft:20}
            console.log(json)
            const response:any = await axios.post(`https://revisionbankapi.herokuapp.com/setstudentsubscriptions`,json,config)
            setSubmitting(false)
            setStudentEmailStored(true)
            const studentresponse:any = await axios.get(`https://revisionbankapi.herokuapp.com/getstudentsubscriptions`,config)
            props.setStudentAccountInfo(studentresponse.data.result)
            if ("message" in response.data){
                if (response.data.message === "all students exist."){
                    setStudentExists(true)

                }
            }
            //console.log(response.data)
        }
            
        
    }
    const addFields = () => {
        let object = {
            email: '',
            password: ''
        }
    
        setFormFields([...formFields, object])
        props.setAccountInfo((accountinfo:any)=> ({...props.accountinfo,numofaccounts:props.accountinfo.numofaccounts-1}))
        }
    
        const removeFields = (index:any) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
        props.setAccountInfo((accountinfo:any)=> ({...props.accountinfo,numofaccounts:props.accountinfo.numofaccounts+1}))
        }

    
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:"50px"}}>
                    <h1 style={{color:"white",marginBottom:"20px"}}>Add New Accounts</h1>
                    <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "60%" :"80%",height:maxRowBased ? props.accountinfo.numofaccounts ? "auto": "60vh"  : "110vh"}}>
                        <div style={{position:"relative",left:"10%",top:"10%",width: "80%",border:"1px grey solid",borderRadius:"5px"}}>
                            <div style={{margin:"20px"}}>
                                
                                <div style={{display:"flex",gap:"8%",borderBottom:"1px grey solid",flexDirection:maxRowBased ? "row":"column"}}>
                                    <p style={{color:"grey"}}>Number of accounts:</p>
                                    <p>{numoaccounts}</p>
                                </div>
                                <form onSubmit={submitStudentSubscription}>
                                    {formFields.map((form, index) => {
                                    return (
                                        <div>
                                            <div key={index} style={{display:"flex",flexDirection:maxRowBased ? "row" :"column",marginTop:"10px"}}>
                                            <input
                                                name='email'
                                                placeholder='Student email'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.email}
                                            />
                                            <input
                        
                                                name='password'
                                                placeholder='Password'
                                                onChange={event => handleFormChange(event, index)}
                                                value={form.password}
                                            />
                                            <button style={{position:"relative",left: maxRowBased ? "auto" :"-60px"}}onClick={() => removeFields(index)}>Remove</button>
                                            </div>
                                        </div>
                                    )
                                    })}
                                </form>
                                <div style={{display:"flex",flexDirection:"row",gap:"26%"}}>
                                    <button onClick={addFields}>Add More..</button>
                                    <br />
                                    {submitting ? <p>Submitting...</p> : <button onClick={submitStudentSubscription}>Submit</button>}
                                </div>
                                <div>
                                {csvfilename !== "" ? <p>{csvfilename}</p> : <div></div>}
                                
                                <form>
                                    <label className="custom-file-upload">
                                        <input 
                                        type={"file"}
                                        id={"csvFileInput"}
                                        accept={".csv"}
                                        onChange={handleOnChange}/>
                                        <UploadIcon style={{fontSize:"25px"}}></UploadIcon>Upload CSV

                                    </label>
                                </form>
                                



                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"row",justifyContent:"center"}}>
                                {studentexists !== true && studentemailstored && <p style={{color:"green"}}>Student emails stored.</p>}
                                {studentexists && <p style={{color:"red"}}>Student already exists.</p>}
                                {selectalloptions && <p style={{color:"red"}}>Please fill in all fields.</p>}
                            </div>
                            
                        </div>
                    </div>
                </div>
                
    )
}

