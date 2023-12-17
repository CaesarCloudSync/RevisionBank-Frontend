import { useState } from "react";
import axios from "axios";
import {Button } from "react-bootstrap"
import UploadIcon from '@mui/icons-material/Upload';
import ManageAddImages from "./manageaddimages";
import ManageRevisionCardsChange from "./managerevisioncardimagechange";
export default function ManageRevisionCardsInfo(props:any){
    const [loading,setLoading] = useState(false);
    const [newsubject,setNewSubject] = useState("");
    const [changesubject,setChangeSubject] = useState(false);
    const [newinterval,setNewInterval] = useState("")
    const [changeinterval,setChangeInterval] = useState(false);

    const [newrevisioncardtitle,setNewRevisionCardTitle] = useState("")
    const [changerevisioncardtitle,setChangeRevisionCardTitle] = useState(false);

    const changerevisioncardmetadata = async () =>{
        if (newinterval || newrevisioncardtitle || newsubject){
            setLoading(true)
            const config = {headers: {Authorization: `Bearer ${props.token}`,}}
            let subject = newsubject === "" ? props.revisioncard.subject: newsubject
            let revisioncardtitle = newrevisioncardtitle  === "" ? props.revisioncard.revisioncardtitle: newrevisioncardtitle
            let revisionscheduleinterval = newinterval === "" ? props.revisioncard.revisionscheduleinterval : newinterval
            const json_data = {"oldsubject":props.revisioncard.subject,"oldrevisioncardtitle":props.revisioncard.revisioncardtitle,"oldrevisionscheduleinterval":props.revisioncard.revisionscheduleinterval,
            "newsubject":subject,"newrevisioncardtitle":revisioncardtitle,"newrevisionscheduleinterval":revisionscheduleinterval}
            const response = await axios.post("https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/changerevisioncardmetadata",json_data,config)
            const result = response.data
            if ("error" in result){
                alert(`Error:${result.error}`)

            }
            else{
                
                window.location.reload();
                setLoading(false)
            }
        }
        else{
            alert("Type into field please.")
        }
    }
    //console.log(props.token)


    return(
        <div>
        <div key={props.index} style={{display:"flex",marginTop:"50px",flexDirection:props.maxRowBased ? "row":"column",justifyContent: "space-between"}}>
            {changesubject === false ? <p onClick={()=>{setChangeSubject(true)}} style={{cursor:"pointer"}} >{props.revisioncard.subject}</p> : 
            <div style={{display:"flex"}}>
            <input placeholder={props.revisioncard.subject} onChange={(e) =>{setNewSubject(e.target.value)}} value={newsubject}></input>
            <p style={{cursor:"pointer"}} onClick={()=>{setChangeSubject(false)}}>x</p>
            </div>}

            {changeinterval === false ? <p onClick={()=>{setChangeInterval(true)}} style={{cursor:"pointer"}} >{props.revisioncard.revisionscheduleinterval} {props.showintervaldatetime(props.revisioncard.revisionscheduleinterval)}</p>: 
            <div style={{display:"flex"}}>
            <input maxLength={4} placeholder={`${props.revisioncard.revisionscheduleinterval}`} onChange={(e) =>{setNewInterval(e.target.value)}} value={newinterval}></input>
            <p style={{cursor:"pointer"}} onClick={()=>{setChangeInterval(false)}}>x</p>
            </div>}
            
            {changerevisioncardtitle === false ? <p onClick={()=>{setChangeRevisionCardTitle(true)}} style={{cursor:"pointer",marginRight:"40px"}} >{props.revisioncard.revisioncardtitle} </p>: 
            <div style={{display:"flex"}}>
            <input  placeholder={`${props.revisioncard.revisioncardtitle}`} onChange={(e) =>{setNewRevisionCardTitle(e.target.value)}} value={newrevisioncardtitle}></input>
            <p style={{cursor:"pointer"}} onClick={()=>{setChangeRevisionCardTitle(false)}}>x</p></div>}
            {((changesubject  || changeinterval  || changerevisioncardtitle === true)  && loading === false) && 
            
            <Button onTouchStart={() => {changerevisioncardmetadata()}} onClick={() => {changerevisioncardmetadata()}} style={{backgroundColor:"#00008B",width:"100px",border:"1px solid #00008B",height:"30px",fontSize:"13px"}}>Change</Button>
            
            }
            {((changesubject  || changeinterval  || changerevisioncardtitle === true)  && loading === true) && 
            
            <Button style={{backgroundColor:"grey",width:"100px",border:"1px solid grey",height:"30px",fontSize:"13px"}}>Change</Button>
            
            }

    </div>
    <textarea onChange={(e:any) => {props.setNewRevisionCard((items:any)=> ({...props.index,revisioncardind:props.index,newrevisoncard:e.target.value}))} } defaultValue={props.revisioncard.revisioncard} name="revisioncard" className="form-control" style={{height: "200px",width:"95%",marginTop:"10px",minHeight:props.maxRowBased ? "500px":"200px"}}>
    </textarea>

            <div style={{display:"flex",flexDirection:props.maxRowBased ? "row": "column"}}>
            {props.revisioncard.revisioncardimage !== undefined && props.revisioncard.revisioncardimage.map((imagedata:any,index:number)=> {return(<ManageRevisionCardsChange revisioncard={props.revisioncard} token={props.token} subject={props.revisioncard.subject} revisioncardtitle={props.revisioncard.revisioncardtitle} cardindex={props.index} index={index} revisioncardimage ={props.revisioncard.revisioncardimage} revisioncardimgname={props.revisioncard.revisioncardimgname} ></ManageRevisionCardsChange>)})}
            </div> 

            {props.revisioncard.revisioncardimage.length < 3 && <ManageAddImages cardindex={props.index}  maxRowBased={props.maxRowBased} revisioncard={props.revisioncard} token={props.token} subject={props.revisioncard.subject} revisioncardtitle={props.revisioncard.revisioncardtitle}/>}

    </div>
    )
}