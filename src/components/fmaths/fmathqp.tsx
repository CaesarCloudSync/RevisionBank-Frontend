import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { Navigate } from "react-router-dom";
import Policies from "../homepage/components/policies";
import Select from "react-select";
import {Bookids, TopicAll, TopicsSelect} from './fmathsqpdata';
import LoadingSpinner from "../../animations/Loadingspinner";

class FmathQPStyles{
  containercenter:Object;
  containercentercol:Object;
  largecontainer :Object;
  inputbars:Object;
  textcolor:Object;
  title:Object;
  constructor(maxRowBased:any){
    this.title = maxRowBased ? {marginLeft: "10%",position:"relative",top:"30px",fontSize:"1.5em",fontWeight:"bold",color:"#3f51b5"} : {}
    this.textcolor = {color:"white"};
    this.containercenter = {display:"flex",justifyContent: maxRowBased ? "left" : "center",marginLeft:maxRowBased ? "2%": "auto"};
    this.inputbars = {width: "100%",marginTop:"5px"}
    this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'column' : 'column',alignItems: maxRowBased ? "left":"center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "2%" : "5%",marginLeft:maxRowBased ? "2%": "auto",width:maxRowBased ?  "15%" : "auto",gap: "10px"};
    this.largecontainer = {backgroundColor:"white",margin: maxRowBased ? "10%" : "30px",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "10px",height: maxRowBased ? "45rem" : "auto"} 
  }
}
export default function FmathQP (){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new FmathQPStyles(maxRowBased);
    let navigate = useNavigate();
    //const [pdfresponse,setPdfResponse] = useState('');
    const location:any = useLocation() //.state
    const token = location.state
    const tokenbool = (token === null) ? false : true // false if token doesnot exist

    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    const [furthermathsbook,setFurthermathsbook]=useState('');
    const [furthermathstopic,setFurthermathstopic] = useState('');
    const [furthermathsbookid,setFurthermathsbookid] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    const [errorBool,setErrorBool] = useState(false);
    const [bookidselect,setBookIDSelect] = useState<any>('');
    const [bookidselectname,setBookIDSelectName] = useState<any>('');
    const [topicselect,setTopicSelect] = useState<any>('');
    const [fillallfields,setFillAllFields] = useState(false);
    const [hideemailprompt,setHideEmailPrompt] = useState(false);
    const [emailcount,setEmailCount] = useState(0);
    const handlebookid = (bookid:any) => {
      if (bookid.label === "Core Maths"){
        setBookIDSelect("c")
        setBookIDSelectName(bookid)
      }
      else if (bookid.label === "Mechanics"){
        setBookIDSelect("m")
        setBookIDSelectName(bookid)
      }
      else if (bookid.label === "Statistics"){
        setBookIDSelect("s")
        setBookIDSelectName(bookid)
      }
      else if (bookid.label === "Further Pure"){
        setBookIDSelect("fp")
        setBookIDSelectName(bookid)
      }
      else if (bookid.label === "Decision Maths"){
        setBookIDSelect("d")
        setBookIDSelectName(bookid)
      }

    }
    //console.log(bookidselect)
    //console.log(topicselect)
    const getemailcount = async () => {
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      const responsecount = await axios.get("https://revisionbankbackend-aoz2m6et2a-uc.a.run.appgetemailcount",config)
      //console.log(responsecount.data)
      if (responsecount.data.emailcount === 0){
        setHideEmailPrompt(false);
        setEmailCount(0)
      }
      if (responsecount.data.emailcount !== 0){
        setHideEmailPrompt(true);
        setEmailCount(responsecount.data.emailcount)
      }
    }
    const sendApi = async (e:any) => {
      //console.log("name",name);
      e.preventDefault();
      setIsLoading(true);
      if ((email  === '' && emailcount !== 0 ) ||  bookidselect === '' || topicselect === ''){ 
        setFillAllFields(true);
        setIsLoading(false);
      }
      else if (email  !== '' ||  bookidselect !== '' || topicselect !== ''){
      setFillAllFields(false);
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      //console.log(email)
      const response = await axios.post("https://revisionbankbackend-aoz2m6et2a-uc.a.run.appfmathsqp",{"furthermaths":{"email":email,"furthermathsbook": bookidselect,"furthermathstopic":topicselect.label,"platform": "web"}},config)
      console.log(response.data)
      if ('error' in response.data){
        setIsLoading(false);
        setErrorBool(true);

        console.log("error",response.data);
      }
      else if (!('error' in response.data)){
        //console.log("response",response.data);
        setIsLoading(false);
        console.log(response.data)
        navigate("/fmathqp/pdf",{state:{"furthermathspdf": response.data.furthermathsresult,"email":email}});
        //navigation.navigate('furthermathsqp', {"furthermathspdf": response.data.furthermathsresult,"email":email});
        setNavigated(true);
      }
      }
      
    }
    useEffect(() => {
      //Runs only on the first render
      getemailcount()
    });
    //<Text style={styles.prompttext}>{pdfresponse && <Text>{pdfresponse}</Text>}</Text>
    useEffect(() => {
      setEmail("");
      setFurthermathstopic("")
      setFurthermathsbook("");
      setNavigated(false)
    }, [navigated])
    console.log(topicselect)
    return (
      <div>
        {tokenbool ? 
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={styles.textcolor}>FurtherMaths Question Papers</h2>
        </div>
        <div style={styles.largecontainer}>
          { hideemailprompt &&
          <div style={Object.assign({},styles.containercenter,{marginTop:"10px"})}>
          <form onSubmit ={(e) => {e.preventDefault(); setEmailIsSet(true)}}>
          <input style={styles.inputbars}
              onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            name="email"
            
          />
          </form>
          </div>
          }

          <div style={styles.containercentercol}>
          <p>{emailisset && <p>Email is set</p>}</p>

          <h2 style={{fontSize:"19px"}}>Select Maths Book:</h2>
          
          <div>
          <Select options={Bookids} value={Bookids.find((obj:any) => obj.value === bookidselect)} onChange= {(e:any) => {handlebookid(e);}}  ></Select>
          </div>
          <h2 style={{fontSize:"19px"}}>Select Maths Topic:</h2>
          <div>
          <Select options={TopicsSelect.fmathsqpselect[bookidselectname.label]} value={TopicAll.find(obj => obj.value === topicselect)} onChange= {(e:any) => {setTopicSelect(e)}}   ></Select>
          <Button style={{fontSize:"13px",marginTop:"10px", position:"relative",left:maxRowBased ? "0px" : "15px"}} variant="contained" color="primary" onClick={sendApi}>Submit</Button>
          </div>

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
        <Policies marginTop="-140px" ></Policies>
        </div>
        :
        <div>
        <Navigate to="/"/>
        </div>}
        
      </div>
    );
  };
