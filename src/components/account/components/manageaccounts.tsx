import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import axios from 'axios'
import { useState,useEffect } from "react";
import { Button } from "react-bootstrap";
import CloseIcon from '@mui/icons-material/Close';
export default function ManageAccounts(props:any){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const [changepassword,setChangePassword] = useState<any>({studentind:-1,clicked:false});
    const [newpassword,setNewPassword] = useState("")
    const [passwordchanged,setPasswordChanged] = useState(false);
    const [studentemailchangepass,setStudentEmailChangePass] = useState("")
    const deletestudentaccount = async (e:any,studentemail:any) => {
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
        //console.log(props.token)
        const response:any = await axios.post(`https://revisionbankapi.herokuapp.com/deletestudentaccount`,{"studentemail":studentemail},config); // Send login post request.
        const studentresponse:any = await axios.get(`https://revisionbankapi.herokuapp.com/getstudentsubscriptions`,config)
        props.setStudentAccountInfo(studentresponse.data.result)
        //console.log(response.data)
            //const response:any = await axios.post(`https://revisionbankapi.herokuapp.com/setstudentsubscriptions`,json,config)

        }
    //console.log(newpassword)
    const changestudentpassword = async (e:any) => {
        e.preventDefault();
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
        //console.log(newpassword)
        const response:any = await axios.put(`https://revisionbankapi.herokuapp.com/changestudentpassword`,{"studentemail":studentemailchangepass,"password":newpassword},config); // Send login post request.
        const studentresponse:any = await axios.get(`https://revisionbankapi.herokuapp.com/getstudentsubscriptions`,config)
        props.setStudentAccountInfo(studentresponse.data.result)
        setChangePassword({studentind:-1,clicked:false})
    }   
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:"50px"}}>
            <div>
            <h1 style={{color:"white",marginBottom:"20px"}}>Manage Your accounts</h1>
            </div>
            <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "60%" :"80%",height:maxRowBased ? props.accountinfo.numofaccounts ? "auto" : "auto"  : "auto"}}>
                <div style={{position:"relative",left:"10%",top:"10%",width: "80%",border:"1px grey solid",borderRadius:"5px",margin:"5px"}}>
                    <div style={{margin:"20px"}}>
                    <div style={{display:"flex",gap:"15%",borderBottom:"1px grey solid",flexDirection:maxRowBased ? "row":"column"}}>
                                    <p style={{color:"grey"}}>Student accounts:</p>
                                    <p>Emails Left</p>
                    </div>
                    {props.studentaccountinfo.map((students:any, index:any) => {
                        //setCurrentStudent(students.email);
                        //console.log(changepassword)
                        return (
                            <div>
                            <div key={index} style={{display:"flex",flexDirection:maxRowBased ? "row" : "column",marginTop:"10px"}}>
                                <div style={{width:"60%"}}>
                                    <p>{students.email}</p>
                                </div>
                                <div style={{width:"30%"}}>
                                    <p >{students.emailsleft}</p>
                                </div>

                                {changepassword.studentind === index ?
                                <div >
                                    <form onSubmit={changestudentpassword}>
                                    <div style={{position:"relative",left:"-30px"}}>
                                        <div style={{display:"flex"}}>
                                            <input style={{width:"95%"}}
                                                    name='email'
                                                    placeholder='New Password'
                                                    onChange={(e:any) => {setNewPassword(e.target.value)}}
                                                    
                                                    
                                                />
                                            <CloseIcon onClick={(e:any) => {setChangePassword((items:any)=> ({...index,studentind:-1,clicked:false}))}} style={{marginTop:"5px",marginLeft:"-19px"}}></CloseIcon>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                :
      
                                <div style={{width:"40%"}}>
                                    <Button onClick={(e:any) =>{setChangePassword((items:any)=> ({...index,studentind:index,clicked:true}));setStudentEmailChangePass(students.email)}} style={{fontSize:"10px"}}>Change Password</Button>
                                </div>
                                }   
                                
                                <div> 
                                    <Button  onClick={(e:any) => deletestudentaccount(e,students.email)} style={{fontSize:"10px"}}>Delete Account</Button>
                                </div>
                            </div>
                            </div>
                        )
                        })} 

                        

                    </div>
                </div>
            </div>
        </div>
    )
}
/*
                                <div key={index} style={{display:"flex",gap:"25%",borderBottom:"1px grey solid",flexDirection:maxRowBased ? "row":"column"}}>
                                <p style={{color:"grey"}}>Email:</p>
                                <p >{students.email}</p>
                                <p><span style={{color:"grey"}}>Emails Left:</span> {students.emailsleft}</p>
                                
                                </div>
*/