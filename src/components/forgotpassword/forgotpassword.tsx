import styled from "styled-components";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import useMediaQuery from "../mediahooks/useMedia";
import RevisionBankLogo from '../static/RevisionBankLogo.svg';
const SigninContainer = styled.div`
position: relative;
max-width: 500px;
min-width: 300px;
max-height: 700px;
width: 30%;
height: 77vh;
margin: 100px auto;
background-color: #FFFFFF;
border-radius: 25px;
`
const HeaderTitle = styled(Typography)`
text-align: center;
font-family: 'open sans', sans-serif;
padding: 2rem 0;
margin: 0;
font-size: 5rem;
`
const SigninRow = styled.div`
  width: 100%;

`
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
export default function ForgotPassword(){
    const [email, setEmail] = useState("");
    const [submitted,setSubmitted] = useState(false);
    const forgotpassword = async (event:any) => { 
        event.preventDefault();
        const response:any = await axios.post(`https://revisionbank.onrender.com/forgotpassword`, {"email":email.toLowerCase()}); // Send login post request.
        setSubmitted(true);
    }   
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    return (
        <div>
        { submitted ?
        <div>
            <div style={{ display: "flex",justifyContent: "center",marginTop:"50px",flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
                <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "30%" :"80%",height:maxRowBased ? "77vh" : "80vh"}}>
                    <div style={{display:"flex",justifyContent:"center",marginTop:"10%"}}>
                        <img src={RevisionBankLogo} style={{width:"10%",height:"10%"}}/>
                        <h1 style={{position:"relative",top:"10px",left:"2px",color:"#264BE4"}}>RevisionBank</h1>
                    </div>
                    <div style={{display:"flex",flexDirection:"column",marginLeft:"10%",marginTop:"25%"}}>
                        <strong>
                        Reset Password
                        </strong>
                        <p style={{marginTop:"20px"}}>
                        If we found an account associated with that username, we've sent password reset instructions to the primary email address on the account.
                        </p>
                        <p style={{marginTop:"40px"}}>
                            Still having trouble logging in? <a style={{color:"#264BE4"}} href="/contactus">Contact Support.</a>
                        </p>
                    </div>
                <div style={{display:"flex",marginTop:"30%",marginLeft:"8%"}}>
                    <p>Don't have a RevisionBank account? <a style={{color:"#264BE4"}} href="/signup">Sign up now!</a></p>
                </div>

                </div>

            </div>
        </div>
        :<div>
                <div style={{ display: "flex",justifyContent: "center",marginTop:"50px",flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
                    <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "30%" :"80%",height:maxRowBased ? "82vh" : "80vh"}}>
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
                            <form onSubmit={forgotpassword} >
                                
                                <SigninInput style={{"width":"84%"}}
                                    variant="outlined"
                                    margin="normal"
                                    label="Email"
                                    fullWidth
                                    required
                                    onChange={(e:any) => setEmail(e.target.value)}
                                />
                                
                            </form>
                        </div>

                        <div style={{display:"flex",marginTop:"30%",marginLeft:"8%"}}>
                            <p>Don't have a RevisionBank account? <a style={{color:"#264BE4"}} href="/signup">Sign up now!</a></p>
                        </div>
                    </div>
                </div>
        </div>
        }
        </div>
    );
}