import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
//import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { Navigate } from "react-router-dom";
import Policies from "../homepage/components/policies";
import Select from "react-select";
import Button from '@mui/material/Button';
import AddRevisionCard from "./components/addrevisioncard";
import HeaderRevision from "../headers/headerrevision";
import LoadingSpinner from "../../animations/Loadingspinner";
class RevisionCardStyles{
  containercenter:Object;
  containercentercol:Object;
  largecontainer :Object;
  inputbars:Object;
  textcolor:Object;
  title:Object;
  containercentersmall:Object;
  constructor(maxRowBased:any){
    this.title = maxRowBased ? {marginLeft: maxRowBased ? "10%" :"20%",position:"relative",top:maxRowBased ? "7rem":"15rem",fontSize:"1.5em",fontWeight:"bold",color:"#3f51b5"} : {}
    this.textcolor = {color:"white"};
    this.containercenter = {display:"flex",justifyContent: maxRowBased ? "left" : "center",marginLeft:maxRowBased ? "2%": "auto",flexDirection: maxRowBased ? 'column' : 'column',alignItems: "left",width:"95%",marginTop:maxRowBased ? "0rem" : "5rem"};
    this.containercentersmall = {display:"flex",justifyContent: maxRowBased ? "left" : "center",marginLeft:maxRowBased ? "2%": "2%",flexDirection: maxRowBased ? 'column' : 'column',alignItems: "left",width:"95%",marginTop:maxRowBased ? "0rem" : "5rem"};
    this.inputbars = {width: "100%",marginTop:"5px"}
    this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'column' : 'column',alignItems: maxRowBased ? "left":"center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "2%" : "5%",marginLeft:maxRowBased ? "2%": "auto",width:maxRowBased ?  "15%" : "auto",gap: "10px"};
    this.largecontainer = {backgroundColor:"white",margin: maxRowBased ? "10%" : "30px",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "10px",height: maxRowBased ? "auto" : "auto"} 
  }
}
export default function RevisionBankScheduler(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new RevisionCardStyles(maxRowBased);
    let navigate = useNavigate();
    //const [pdfresponse,setPdfResponse] = useState('');
    const location:any = useLocation() //.state
    const token = location.state
    const tokenbool = (token === null) ? false : true // false if token doesnot exist

    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);

    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    const [errorBool,setErrorBool] = useState(false);
    const [fillallfields,setFillAllFields] = useState(false);
    const [showemailprompt,setShowEmailPrompt] = useState(false);
    const [emailcount,setEmailCount] = useState(0);
    const getemailcount = async (token:any) => {
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      const responsecount = await axios.get("https://revisionbankbackendsql-aoz2m6et2a-uc.a.run.app/getemailcount",config)
      //console.log(responsecount.data)
      if (responsecount.data.emailcount === 0){
        setShowEmailPrompt(false);
        setEmailCount(0)
      }
      if (responsecount.data.emailcount !== 0){
        setShowEmailPrompt(true);
        setEmailCount(responsecount.data.emailcount)
      }
    }
    useEffect(() => {
      getemailcount(token)
    })

    return (
      <div>
        {tokenbool ? 
        <div>
        <HeaderRevision token = {token.token}></HeaderRevision>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={{position:"relative",top:"30px",color:"white"}}>RevisionBank Notecards</h2>
        </div>
        <div style={styles.largecontainer}>
          
          <div style={Object.assign({},styles.containercentersmall)}>
          <h3 style={{marginTop:maxRowBased ? "3%":"3%",marginLeft:maxRowBased ? "1.5%": "3%"}}>
            RevisionBank Notecard
          </h3>
          <p style={{marginTop:"5px",marginBottom:maxRowBased ? "0px" :"5px",marginLeft:maxRowBased ? "15px" : "10px"}}>Create,Schedule and store revision cards to improve your revision.</p>
          <AddRevisionCard emailcount={emailcount} showemailprompt={showemailprompt} token={token}></AddRevisionCard>

        </div>
          

        <div style={styles.containercenter}>
          <p>{isLoading && <LoadingSpinner/>}</p>
        </div>
        <div style={styles.containercenter}>
          <p>{errorBool && <p>Question paper does not exist.</p>}</p>
        </div>
        <div style={styles.containercenter}>
          <p>{fillallfields && <p>Select all options.</p>}</p>
        </div>
        </div>
        <Policies marginTop="-90px" ></Policies>
        </div>
        :
        <div>
        <Navigate to="/"/>
        </div>}
        
      </div>
    );
  };
