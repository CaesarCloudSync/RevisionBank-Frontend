import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "./useMedia";
import { maxRowBasedquery } from "./mediamax";

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
    this.inputbars = {width: "100%"}
    this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "2%" : "5%",marginLeft:maxRowBased ? "2%": "auto"};
    this.largecontainer = {margin: maxRowBased ? "10%" : "none",marginTop: maxRowBased ? "2%": "none",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "none"} 
  }
}
export default function OCRScience (){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new FmathQPStyles(maxRowBased);
    let navigate = useNavigate();
    //const [pdfresponse,setPdfResponse] = useState('');
    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    
    const [ocrsubject,setOCRSubject]=useState('');
    var [chapter,setChapter] = useState('');
    const [bookalpha,setBookAlpha] = useState('');
    const [bookyear,setBookYear] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    const [error,setError] = useState(false);
    const [alphaset,setAlphaSet] = useState(false);
    const [datanotset,setDataNotSet] = useState(false);

    //onSubmitEditing ={() => sendApi(name)}
    const sendApi = async (e:any) => {
      //console.log("name",name);
      e.preventDefault();
      setIsLoading(true);
        if (!chapter.includes("chapter")){
            chapter = `chapter ${chapter}`;
        }
      const response = await axios.post("https://palondomus-api.herokuapp.com/ocrsciencebookanswers",{"physicsocr":{"email":email,"subject": ocrsubject.toLowerCase(),"chapter":chapter,"physicsocralph":bookalpha.toUpperCase(),"year":bookyear,"platform": "web"}})
;     if (email !== "" && ocrsubject !== "" && chapter !== "" && bookalpha !== "" && bookyear !== ""){
      if (!Object.keys(response.data).includes("error")){   
      setIsLoading(false);
      navigate("/ocrscience/pdf",{state:{"ocrsciencepdf": response.data,"email":email,"subject": ocrsubject.toLowerCase(),"chapter":chapter,"physicsocralph":bookalpha,"year":bookyear}});
      setNavigated(true);
      }
      else{
        console.log("error",response.data.error);
        setIsLoading(false);
        setError(true);
      }
    }
    else{
      setIsLoading(false);
      setDataNotSet(true);
    }
    }
  
    useEffect(() => {
      setEmail("");
      setChapter("")
      setOCRSubject("");
      setBookAlpha("");
      setBookYear("");
      setNavigated(false)
      setAlphaSet(false);
      setDataNotSet(false);
      setIsLoading(false);
      setError(false);
      setEmailIsSet(false);
    }, [navigated,error,datanotset])

    return (
      <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={styles.textcolor}>Physics, Biology and Chemistry OCR </h2>
        </div>
        <div style={styles.largecontainer}>
          <div style={styles.containercenter}>
          <h2 style={styles.textcolor}>Physics, Biology and Chemistry QP Markschemes</h2>
          </div>
          <div style={styles.containercenter}>
          <form onSubmit ={(e) => {e.preventDefault(); setEmailIsSet(true)}}>
          <input style={styles.inputbars}
              onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email"
            
          />
          </form>
          </div>
          <div style={styles.containercenter}>
          <p>{emailisset && <p>Email is set</p>}</p>
        </div>
          <div style={styles.containercentercol}>
          <Button variant= "contained" onClick={() => { setOCRSubject("Physics")}}><p>Physics</p></Button>
          <Button variant= "contained" onClick={() => {setOCRSubject("Biology")}}><p>Biology</p></Button>
          <Button variant= "contained" onClick={() => {setOCRSubject("Chemistry")}}><p>Chemistry</p></Button>
          </div>
          <div style={styles.containercenter}>
          <p >{ ocrsubject && <p>Subject Selected {ocrsubject}</p>}</p>    
            </div>
          <div style={styles.containercenter}>
            <h3 style={styles.textcolor}>Physics, Biology and Chemistry Book A or B</h3>
          </div>

        <div style={styles.containercenter}>
          <form onSubmit ={(e) => {e.preventDefault();setAlphaSet(true)}}>
            <input style={styles.inputbars}
                onChange={(e) => setBookAlpha(e.target.value)} 
                value={bookalpha}
                placeholder="Enter A or B"
            />
            </form>
                
        </div>
        <div style={styles.containercenter}>
          <p>{alphaset && <p>Book type selected</p>}</p>
        </div>
        <div style={styles.containercentercol}>
          <Button variant= "contained" onClick={() => {setBookYear("AS/Year 1")}}><p>AS/Year 1</p></Button>
          <Button variant= "contained" onClick={() => {setBookYear("A Level")}}><p>A Level</p></Button>
          <Button variant= "contained" onClick={() => {setBookYear("Year 2")}}><p>A Year 2</p></Button>
          </div>
          <div style={styles.containercenter}>
            <p>{ bookyear && <p>Year Selected {bookyear}</p>}</p>
            </div>
          
          <div style={styles.containercenter}>
            <h3 style={styles.textcolor}>Physics, Biology or Chemistry Chapter</h3>
          </div>
          
          <div style={styles.containercenter}>
          
          <form onSubmit ={(e) => sendApi(e)}>
          <input style={styles.inputbars}
            onChange={(e) => setChapter(e.target.value)} 
            value={chapter}
            placeholder="Enter Chapter number"
          />
          </form>
          
          
          </div>
          <div style={styles.containercenter}>
          <p>{isLoading && <p>Loading...</p>}</p>
        </div>
        <div style={styles.containercenter}>
          <p>{error && <p>Chapter doesn't exist</p>}</p>
        </div>
        <div style={styles.containercenter}>
          <p>{datanotset && <p>Please select all options</p>}</p>
        </div>
        </div>
        
      </div>
    );
  };
