import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { Navigate } from "react-router-dom";
import Policies from "../homepage/components/policies";
import Select from "react-select";
import {Bookids,EdexcelIndexAll,EdexcelSelect} from './edexcelqpdata';
import LoadingSpinner from "../../animations/Loadingspinner";
//man = ""

class EdexcelMathsStyles{
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
export default function EdexcelMaths(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new EdexcelMathsStyles(maxRowBased);
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
    const [fillallfields,setFillAllFields] = useState(false);
    const [hideemailprompt,setHideEmailPrompt] = useState(false);
    const [emailcount,setEmailCount] = useState(0);
    const [edexcelpapersset,setEdexcelPapersset] = useState<any>(false);
    const [edexcelpdfindex,setEdexcelpdfindex] = useState<any>(-1);
    //edexcelpapers[0]["Paper pdf"]
    const handlebookid = (bookid:any) => {
        setBookIDSelect(bookid.label)


    }
    const handlepdfindex = (pdfindex:any) => {
      setEdexcelpdfindex(pdfindex.label)


  }
    //console.log(bookidselect)
    //console.log(topicselect)
    const getemailcount = async () => {
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      const responsecount = await axios.get("https://revisionbank.onrender.com/getemailcount",config)
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
      if ( bookidselect === '' || edexcelpdfindex === -1){ // (emailcount !== 0 ) || email  === '' && 
        setFillAllFields(true);
        setIsLoading(false);
      }
      else if (bookidselect !== '' || edexcelpdfindex !== -1){ // || email  !== '' 
      setFillAllFields(false);
      var scheme = edexcelpdfindex
      var edexcelpapername = `A Level ${bookidselect} ${scheme.replace('Paper','')}`
      const json =  {"edexcelpaper":edexcelpapername}
      const config = {headers: {Authorization: `Bearer ${token.token}`}}
      const responsedexcelqp:any =  await axios.post("https://revisionbank.onrender.com/getedexcelqp",json,config)
      //console.log(responsedexcelqp.data)
      let edexcelbase64pdf = responsedexcelqp.data.edexcelpaper[`${edexcelpapername}`]
      let edexcelpaperpdflinkname = `alevel${bookidselect.replace(/ /g, "")}${scheme.replace(/ /g, "")}.pdf`
      navigate(`/edexcelmaths/${edexcelpaperpdflinkname}`.toLowerCase(),{state:{edexcelpdf:edexcelbase64pdf,edexcelinkname:edexcelpaperpdflinkname }})
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

    //console.log(edexcelpdfindex)
    return (
      <div>
        {tokenbool ? 
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={styles.textcolor}>FurtherMaths Question Papers</h2>
        </div>
        <div style={styles.largecontainer}>

          

          <div style={styles.containercentercol}>
          <p>{emailisset && <p>Email is set</p>}</p>

          <h2 style={{fontSize:"19px"}}>Select Maths Book:</h2>
          <div>
          <Select options={Bookids} value={Bookids.find((obj:any) => obj.value === bookidselect)} onChange= {(e:any) => {handlebookid(e);}}  ></Select>
          </div>
          <div>
          {/*This will range and vary depending on number of papers for each, Note: Even indexes are Question Papers and Odd indexes are markschemes */}
          {/*TODO: 3 Papers pairs will be given each time whilst emailing.*/}
          {/*<Select options={TopicsSelect.fmathsqpselect[bookidselectname.label]} value={TopicAll.find(obj => obj.value === topicselect)} onChange= {(e:any) => {setTopicSelect(e)}}   ></Select> */}
          <Select options={EdexcelSelect[bookidselect]} value={EdexcelIndexAll.find((obj:any) => obj.value === edexcelpdfindex)} onChange= {(e:any) => {handlepdfindex(e);}}  ></Select>
          </div>
          

          <div>
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

// Email Prompt
/*
          
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
  */