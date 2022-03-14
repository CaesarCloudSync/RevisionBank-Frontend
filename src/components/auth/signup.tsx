import React,{useEffect} from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import axios from "axios";
import styled from 'styled-components'
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import LoadingSpinner from "../../animations/Loadingspinner";
import {useNavigate,useLocation} from 'react-router-dom';
import HeaderComponent from "../headers/headerhome";
interface IFormInput {
    email: string;
    password: string;
  }
const textfieldstyle = {"width":"50%"}
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(8).max(120),
});
const SigninContainer = styled.div`
max-width: 500px;
min-width: 300px;
max-height: 700px;
width: 30%;
height: 60%;
margin: 100px auto;
background-color: #FFFFFF;
border-radius: 25px;
`
const HeaderTitle = styled(Typography)`
text-align: center;
font-family: 'open sans', sans-serif;
padding: 2rem 0;
margin: 0;
font-size: 2rem;
`
const SigninRow = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding-top: 2rem;
max-width: 100%;
:nth-child(3){
  margin: 10px;
  padding-bottom: 1.5rem;
}
`
const SigninInput = styled(TextField)`
width: 80%;
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
const SigninButton = styled(Button)`
border-radius: 25px;
width: 80%;
height: 40px;
font-size: 1.3rem;
color: white;
font-weight: 700;
background: rgb(34,193,195);
background: linear-gradient(90deg, rgba(34,193,195,1) 0%,     rgba(253,187,45,1) 100%);
border: 0px;
cursor: pointer;
transition: opacity 0.25s ease-out;
`
function Signup() {
    const [signupResponse,setsignupResponse] = useState<IFormInput>();
    const [isLoadingSignup, setIsLoadingSignup] = useState<Boolean>(false);
    const [errorMessageSignup, setErrorMessageSignup] = useState<string>("");
    const [noResultsSignup, setNoResultsSignup] = useState<Boolean>(false);
    const [jwttoken,setJwttoken] = useState<Boolean>(false);
    const [notSignedUp,setNotSignedup] = useState<Boolean>(false);
    let navigate:any = useNavigate();
    let location:any = useLocation();
    let subscription = location.state;
    //console.log(subscription)
    const {register : registerSignup,handleSubmit : handleSubmitSignup,formState: { errors },} = useForm<IFormInput>({
        resolver: yupResolver(schema),
        });
    const onSubmit = async (data: IFormInput) => {
        setErrorMessageSignup("")
        setNoResultsSignup(false);
        setIsLoadingSignup(true);
        setJwttoken(false)
        setNotSignedup(false)
        var json = JSON.parse(JSON.stringify(data));
        
        const response:any = await axios.post(`https://palondomus-api.herokuapp.com/signupapi`, json);
        setsignupResponse(response.data);
        setIsLoadingSignup(false);
        if (response.data !== undefined){
          if ("status" in response.data){
            setJwttoken(true)
            
            if (subscription === null){
              navigate("/pricing",{state:{"token":response.data.access_token}}) // Navigate to home page
              
            }
            else if (subscription !== null){
              navigate("/payment",{state:{"token":response.data.access_token,"subscription":subscription.subscription}}) // Navigate to home page

            }

          }
        }
       else if ("message" in response.data){
          setNotSignedup(true)
        }
        

        };

    useEffect(() => {
      if (signupResponse !== undefined){
      if ("status" in signupResponse){
        setJwttoken(true)
        navigate("/stemscraper",{state: {token: jwttoken}})
      }
    else if ("message" in signupResponse){
      setNotSignedup(true)
    }}


    }, [signupResponse]);
  
  return (
      <div>
    <HeaderComponent/>
    <SigninContainer>
        <HeaderTitle variant="h2">
          Sign Up
        </HeaderTitle>
      

        
        <form onSubmit={handleSubmitSignup(onSubmit)} noValidate>
        <SigninRow>
          <SigninInput style={textfieldstyle}
            {...registerSignup("email")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={errors.email?.message}
            error={!!errors.email?.message}
            fullWidth
            required
          />
         </SigninRow>
         <SigninRow>
          <SigninInput style={textfieldstyle}
            {...registerSignup("password")}
            variant="outlined"
            margin="normal"
            label="Password"
            helperText={errors.password?.message}
            error={!!errors.password?.message}
            type="password"
            fullWidth
            required
          />
          </SigninRow>
          <SigninRow>
          {isLoadingSignup ? <LoadingSpinner /> : null}
          {noResultsSignup ? <p>No Results Found</p> : null}
          {errorMessageSignup && <div className="error">{errorMessageSignup}</div>}
          {jwttoken && <p>Signed up!</p>}
          {notSignedUp && <p>Email already exists.</p>}
          <SigninButton 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            <p style={{fontSize:"13px",marginTop:"5px"}}>Sign Up</p>
          </SigninButton >
          </SigninRow>
        

        </form>
        </SigninContainer>
      </div>
  )
}

export default Signup;
// navigate("/stemprofile",{state: {token: response.data}})