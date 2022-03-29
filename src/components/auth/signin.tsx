import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import LoadingSpinner from "../../animations/Loadingspinner";
import styled from 'styled-components'
import HeaderComponent from '../headers/headerhome';
import {useNavigate,useLocation} from 'react-router-dom';
//import './signin.css'
// https://javascript.plainenglish.io/creating-a-sign-up-form-in-react-with-typescript-516b1a172913
// TODO Next to collect specific data from database send requests to api with jwttoken in the axios header.
interface IFormInput {
  email: string;
  password: string;
} // Interface form of data
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
background-color: black;
border: 0px;
cursor: pointer;
transition: opacity 0.25s ease-out;
`
const textfieldstyle = {"width":"50%"}
const schema = yup.object().shape({
  email: yup.string().required().email(), 
  password: yup.string().required() //.min(8).max(120),
}); // Create Rigid scheme that the form has to abide by.
function Signin(){
    const [isLoadingLogin, setIsLoadingLogin] = useState<Boolean>(false); // State dealing with loading spinner
    const [noResultsLogin, setNoResultsLogin] = useState<Boolean>(false); // TODO for catch errors
    const [incorrectPassword,setIncorrectPassword] = useState<Boolean>(false); // handles incorrect login
    const [subdoesnotexist,setSetSubdoesnotexist]= useState<Boolean>(false); 
    const [errorsignin,setErrorSignin] = useState<Boolean>(false);
    //const [jwttoken,setJWTToken] = useState<IFormInput>(); // Initialize jwttoken 
    const [loginerror,setLoginError] = useState<Boolean>(false); // handles incorrect login
    let navigate:any = useNavigate(); // use navigate hook to navigate to different pages
    let current_date = new Date().toISOString();
    //let location:any = useLocation();
    //let statevalue = location.state;
    //const subscription = (statevalue !== null) ? statevalue.subscription : "" 
    //const price = (statevalue !== null) ? statevalue.price : "" 
    
    const checkSubscriptionEndDate = async (token:string,json:any) => {
      const config = {headers: {Authorization: `Bearer ${token}`,}}
      const responseget:any = await axios.get(`https://palondomus-api.herokuapp.com/getsubscription`,config); // Send login post request.
      let end_date = responseget.data.end_date_subscription 
      //console.log(end_date)
      if (end_date < current_date) {
        console.log("Subscription has expired")
        navigate("/pricing",{state:{"token":token,"pre_subscription_expiration":"expired","email":json.email}})
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const responsedel:any = await axios.delete(`https://palondomus-api.herokuapp.com/deletesubscription`,config);
        // TODO Test this by looking on whether it works if the dates are in the future.
      }
      else if (end_date === current_date) {
        console.log("Subscription will expire today")
        navigate("/stemscraper",{state:{"token":token,"email":json.email}})
      }
      else if (end_date > current_date) {
        console.log("Subscription will expire on " + end_date)
        navigate("/stemscraper",{state:{"token":token,"email":json.email}})
      }
      else if (responseget.data.end_date_subscription === undefined) {
       //console.log(token)
        navigate("/pricing",{state:{"token":token,"pre_subscription_expiration":"expired","email":json.email}})
        //console.log("Subscription doesn't exist")
        setSetSubdoesnotexist(true)
        //

      }
    }
  
    const { register: registerLogin,handleSubmit: handleSubmitLogin ,formState: { errors: loginerrors },} = useForm<IFormInput>({
        resolver: yupResolver(schema),
      }); // stores data from form into register data and handler,using "registerLogin" and "handleSubmitLogin" as aliases
    const onSubmitLogin = async (data: IFormInput) => { 
        setIncorrectPassword(false) // Resets Incorrect password state
        setNoResultsLogin(false); // Resets error handling state
        setIsLoadingLogin(true); // Starts loading spinner
        try{
        var json = JSON.parse(JSON.stringify(data)); // Converts data to json
        
        const response:any = await axios.post(`https://palondomus-api.herokuapp.com/loginapi`, json); // Send login post request.
        if (response.data !== undefined){
          if ("access_token" in response.data){
            checkSubscriptionEndDate(response.data.access_token,json)
             // Navigate to home page


          }
        }
        if ("message" in response.data){
          setIncorrectPassword(true)
        }
        setIsLoadingLogin(false); 
      
  //setJWTToken(response.data); // response is a jwttoken which is basically a footprint for the user to access certain data
       // Stops spinner
        }
        catch(error){
          setErrorSignin(true) // Error handling
          setIsLoadingLogin(false); 
        }

        
    
      };
    


    return(
      <div>
      <HeaderComponent/>
      <SigninContainer>
        <HeaderTitle variant="h2">
          Sign in
        </HeaderTitle>
      

        
        <form onSubmit={handleSubmitLogin(onSubmitLogin)} noValidate>
        <SigninRow>
          <SigninInput style={textfieldstyle}
            {...registerLogin("email")}
            variant="outlined"
            margin="normal"
            label="Email"
            helperText={loginerrors.email?.message}
            error={!!loginerrors.email?.message}
            fullWidth
            required
          />
         </SigninRow>
         <SigninRow>
          <SigninInput style={textfieldstyle}
            {...registerLogin("password")}
            variant="outlined"
            margin="normal"
            label="Password"
            helperText={loginerrors.password?.message}
            error={!!loginerrors.password?.message}
            type="password"
            fullWidth
            required
          />
          </SigninRow>
          <SigninRow>
          {isLoadingLogin ? <LoadingSpinner /> : null}
          {noResultsLogin ? <p>No Results Found</p> : null}
          {errorsignin && <p>Check your network connection.</p>}
          {incorrectPassword && <p>The username or password is incorrect.</p>}
          {subdoesnotexist && <p>Subscription does not exist.</p>}
          <SigninButton 
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
           <p style={{fontSize:"13px",marginTop:"5px"}}>Sign in</p>
          </SigninButton >
          </SigninRow>
        

        </form>
        </SigninContainer>
      </div>
    )
}

export default Signin;