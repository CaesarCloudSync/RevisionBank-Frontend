import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState,useEffect } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import useMediaQuery from "../mediahooks/useMedia";
import { Navigate } from "react-router";
import { useLocation,useNavigate } from "react-router";
import RevisionBankLogo from '../static/RevisionBankLogo.svg';
const SigninInput = styled(TextField)`
width: 90%;
box-sizing: border-box;
border: none;
font-size: 1.3rem;
padding-left: 1.5rem;
padding-bottom: 1rem;
box-shadow: inset 0px -3px 0px 0px rgba(187,187,187,0.2);
transition: box-shadow 0.2s ease-in;
:focus{
  box-shadow: inset 0px -3px 0px 0px rgba(34,193,195,0.7);
  outline: none;
}
::-webkit-input-placeholder{
  opacity: 1;
  transition: opacity 0.25s ease-out;
}
:hover::-webkit-input-placeholder,
:focus::-webkit-input-placeholder{
  opacity: 0;
}
`
export default function ResetPassword(){
    const location = useLocation();
    const statevalue:any = location.search
    const statebool = (statevalue === '') ? false : true // instead of null its ''
    const token = (statevalue !== '') ? statevalue.slice(7, ) : "" 
    const [newpassword, setNewPassword] = useState("");
    const [confirmnewpassword, setConfirmNewPassword] = useState("");
    const [differentpassword,setDifferentPassword] = useState(false);
    const [emailsub,setEmailSub] = useState(false);
    const [submitted,setSubmitted] = useState(false);
    let navigate = useNavigate();
    //console.log(token)
    const resetpassword = async (event:any) => { 
        event.preventDefault(); 
        if (newpassword === confirmnewpassword){
            const config = {headers: {Authorization: `Bearer ${token}`,}}
            console.log(config)
            console.log(newpassword)
            const response:any = await axios.put(`https://revisionbankapi.herokuapp.com/resetpassword`, {"password":newpassword},config); // Send login post request.
            console.log(response)
            navigate("/signin");
            setSubmitted(true);
            setDifferentPassword(false);
        } 
        else{
            setDifferentPassword(true)
        }  
    }
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    
    return(
        <div>
            { statebool ? 
            <div style={{ display: "flex",justifyContent: "center",marginTop:"50px",flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
                <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "30%" :"80%",height:maxRowBased ? "93vh" : "80vh"}}>
                    <div style={{display:"flex",justifyContent:"center",marginTop:"20%"}}>
                        <img src={RevisionBankLogo} style={{width:"10%",height:"10%"}}/>
                        <h1 style={{position:"relative",top:"10px",left:"2px",color:"#264BE4"}}>RevisionBank</h1>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",marginLeft:"10%",marginTop:"25%"}}>
                        <strong>
                        Reset Password
                        </strong>
                        <p style={{marginTop:"20px"}}>
                        To reset your password, please provide your RevisionBank email.
                        </p>
                        
                            
                        <SigninInput style={{"width":"84%"}}
                            variant="outlined"
                            margin="normal"
                            label="New password"
                            type="password"
                            fullWidth
                            required
                            onChange={(e:any) => setNewPassword(e.target.value)}
                        />
                            
                        
                        <form onSubmit={resetpassword} >
                            
                            <SigninInput style={{"width":"84%"}}
                                variant="outlined"
                                margin="normal"
                                label="Confirm password"
                                type="password"
                                fullWidth
                                required
                                onChange={(e:any) => setConfirmNewPassword(e.target.value)}
                            />
                            
                        </form>
                        {differentpassword && <p>Passwords have to be the same!</p>}
                        {submitted && <p>Submitted</p> }
                    </div>

                    <div style={{display:"flex",marginTop:"30%",marginLeft:"8%"}}>
                        <p>Don't have a RevisionBank account? <a style={{color:"#264BE4"}} href="/signup">Sign up now!</a></p>
                    </div>
                </div>
            </div>
            :
            <div>
            <Navigate to="/"/>
            </div>
        }



        </div>
    )
}

//const responsegettoken:any = await axios.get(`https://revisionbankapi.herokuapp.com/getforgotpasswordtoken`,config); // Send login post request.
//console.log(responsegettoken.data.token)