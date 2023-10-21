import { useState } from "react";
import axios from "axios";
import {Button } from "react-bootstrap"
import UploadIcon from '@mui/icons-material/Upload';
import RevisionCardImages from "./revisioncardimages";
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
            const response = await axios.post("http://192.168.0.22:8080/changerevisioncardmetadata",json_data,config)
            const result = response.data
            if ("error" in result){
                alert(`Error:${result.error}`)

            }
            else{
                setLoading(false)
                window.location.reload();
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

    {props.revisioncard.revisioncardimage !== undefined &&
        <table>
            <tbody >
            <tr>
            {props.revisioncard.revisioncardimgname.map((val:any,ind:number)=> {return(<RevisionCardImages ind={ind} revisioncardimgname ={props.revisioncard.revisioncardimgname} revisioncardimage ={props.revisioncard.revisioncardimage}  currentuse={"names"}></RevisionCardImages>)})}
            </tr>
            <tr>
            {props.revisioncard.revisioncardimage.map((val:any,ind:number)=> {return(<RevisionCardImages ind={ind} revisioncardimgname ={props.revisioncard.revisioncardimgname} revisioncardimage ={props.revisioncard.revisioncardimage} currentuse={"image"}></RevisionCardImages>)})}
            </tr>
            </tbody>
        </table>
        }
    </div>
    )
}