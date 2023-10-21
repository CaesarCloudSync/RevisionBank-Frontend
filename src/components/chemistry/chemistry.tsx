import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { Navigate } from "react-router-dom";
import Policies from "../homepage/components/policies";
import Select from "react-select";
import chemistryaqaselectcollect from "./chemistryaqadata";
import LoadingSpinner from "../../animations/Loadingspinner";
//import {Bookids,EdexcelIndexAll,EdexcelSelect} from './edexcelqpdata';
//man = ""

class PhysicsOCRStyles{
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
function base64ToBlob(base64:any) {
  const binaryString = window.atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; ++i) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return new Blob([bytes], { type: 'application/pdf' });
  
};
export default function ChemistryAQA(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new PhysicsOCRStyles(maxRowBased);
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
    const [computerscienceselect,setComputerScienceSelect] = useState<any>('');
    const [computerscienceselectmarkscheme,setComputerScienceSelectMarkscheme] = useState<any>('');
    const [fillallfields,setFillAllFields] = useState(false);
    const [hideemailprompt,setHideEmailPrompt] = useState(false);
    const [emailcount,setEmailCount] = useState(0);
    const [edexcelpapersset,setEdexcelPapersset] = useState<any>(false);
    const schemeselect = [{"label":"qp","value":0},{"label":"ms","value":1}]
    var chemistryaqaselect = chemistryaqaselectcollect()
    
    //edexcelpapers[0]["Paper pdf"]
    // TODO Create Separate Mark Scheme part.
    const handlebookid = (bookid:any) => {
        setComputerScienceSelect(bookid.label)


    }
    const handlecompmsid = (bookid:any) => {
      setComputerScienceSelectMarkscheme(bookid.label)


  }

    //console.log(computerscienceselect)
    //console.log(topicselect)
    const getemailcount = async () => {
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      const responsecount = await axios.get("http://192.168.0.22:8080/getemailcount",config)
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
      if ( computerscienceselect === '' || computerscienceselectmarkscheme === ''){ // (emailcount !== 0 ) || email  === '' && 
        setFillAllFields(true);
        setIsLoading(false);
      }
      else if (computerscienceselect !== '' && computerscienceselectmarkscheme !== ''){ // || email  !== '' 
      setFillAllFields(false);
      var chemistryaqaselectcollectclean = computerscienceselect.replace(/[^\w\s]/gi, '').toLowerCase().replace(/ /g, "")
      const json =  {"questionpapersubject":computerscienceselect,"scheme":computerscienceselectmarkscheme,"subject":"chemistry"}
      console.log(json)

      const config = {headers: {Authorization: `Bearer ${token.token}`}}
      const responsaqaphysicsocrqp:any =  await axios.post("http://192.168.0.22:8080/getphysicsocrqp",json,config)
      //console.log(responsaqaphysicsocrqp.data)
      let physicsocrbase64pdf = responsaqaphysicsocrqp.data.questionpapersubject //[`${computerscienceselect.replace("qp","").replace(" ","")}`]
  
      let physicsocrpaperpdflinkname = `${chemistryaqaselectcollectclean}.pdf`
      let physicsblob = base64ToBlob(physicsocrbase64pdf)
      
      var blobURL = URL.createObjectURL(physicsblob)   //+ "#test?test"
      //console.log(blobURL)
      window.open(blobURL);
      URL.revokeObjectURL(blobURL)
      window.location.reload();
      //navigate(`/physicsocr/${physicsocrpaperpdflinkname}`.toLowerCase(),{state:{physicsocrsciencepdf:physicsocrbase64pdf,physicsocrlinkname:physicsocrpaperpdflinkname }})
     
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

    //console.log(computerscienceselectmarkscheme)
    return (
      <div>
        {tokenbool ? 
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={styles.textcolor}>AQA Chemistry Question Papers</h2>
        </div>
        <div style={styles.largecontainer}>

          

          <div style={styles.containercentercol}>
          <p>{emailisset && <p>Email is set</p>}</p>

          <h2 style={{fontSize:"19px"}}>Select Chemistry Paper:</h2>
          <div>
          <Select options={chemistryaqaselect} value={chemistryaqaselect.find((obj:any) => obj.value === computerscienceselect)} onChange= {(e:any) => {handlebookid(e);}}  ></Select>
          </div>

          <div>
          <Select options={schemeselect} value={schemeselect.find((obj:any) => obj.value === computerscienceselectmarkscheme)} onChange= {(e:any) => {handlecompmsid(e);}}  ></Select>
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


  /*

<div>
<Select options={EdexcelSelect[computerscienceselect]} value={EdexcelIndexAll.find((obj:any) => obj.value === computerscienceselectmarkscheme)} onChange= {(e:any) => {handlepdfindex(e);}}  ></Select>
</div>
  */