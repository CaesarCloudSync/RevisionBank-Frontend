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
    this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "5%" : "5%",marginLeft:maxRowBased ? "2%": "auto"};
    this.largecontainer = {margin: maxRowBased ? "10%" : "none",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "none"} 
  }
}
export default function FmathQP (){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new FmathQPStyles(maxRowBased);
    let navigate = useNavigate();
    //const [pdfresponse,setPdfResponse] = useState('');
    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    const [furthermathsbook,setFurthermathsbook]=useState('');
    const [furthermathstopic,setFurthermathstopic] = useState('');
    const [furthermathsbookid,setFurthermathsbookid] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    //onSubmitEditing ={() => sendApi(name)}
    const sendApi = async (e:any) => {
      //console.log("name",name);
      e.preventDefault();
      setIsLoading(true);
      const response = await axios.post("https://palondomus-api.herokuapp.com/fmathsqp",{"furthermaths":{"email":email,"furthermathsbook": furthermathsbook,"furthermathstopic":furthermathstopic,"platform": "web"}})
      //console.log("pdfresponse",response.data.furthermathsresult);      
      //setPdfResponse(response.data.furthermathsresult)
      setIsLoading(false);
      navigate("/fmathqp/pdf",{state:{"furthermathspdf": response.data.furthermathsresult,"email":email}});
      //navigation.navigate('furthermathsqp', {"furthermathspdf": response.data.furthermathsresult,"email":email});
      setNavigated(true);
    }
  
    //<Text style={styles.prompttext}>{pdfresponse && <Text>{pdfresponse}</Text>}</Text>
    useEffect(() => {
      setEmail("");
      setFurthermathstopic("")
      setFurthermathsbook("");
      setNavigated(false)
    }, [navigated])
    //console.log(pdfresponse)
    return (
      <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={styles.textcolor}>FurtherMathsScraper</h2>
        </div>
        <div style={styles.largecontainer}>
          <div style={styles.containercenter}>
          <h2 style={styles.textcolor}>FMathsQP</h2>
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
          <div style={styles.containercentercol}>
          <p>{emailisset && <p>Email is set</p>}</p>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("c"); setFurthermathsbookid("Core Maths")}}><p>Core Maths</p></Button>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("m"); setFurthermathsbookid("Mechanics")}}><p>Mechanics</p></Button>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("s"); setFurthermathsbookid("Statistics")}}><p>Statistics</p></Button>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("fp"); setFurthermathsbookid("Further Pure")}}><p>Further Pure</p></Button>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("d"); setFurthermathsbookid("Decision Maths")}}><p>Decision Maths</p></Button>
          <Button variant= "contained" onClick={() => {setFurthermathsbook("a"); setFurthermathsbookid("All")}}><p>All</p></Button>
          <p >{ furthermathsbook && <p>Further Maths Book Selected {furthermathsbookid}</p>}</p>
          </div>
          <div style={styles.containercenter}>
            <h3 style={styles.textcolor}>FMaths Topic</h3>
          </div>
          <div style={styles.containercenter}>
          
          <form onSubmit ={(e) => sendApi(e)}>
          <input style={styles.inputbars}
            onChange={(e) => setFurthermathstopic(e.target.value)} 
            value={furthermathstopic}
            placeholder="Enter Further Maths Topic"
          />
          </form>
          <p>{isLoading && <p>Loading...</p>}</p>
          </div>
        </div>
        
      </div>
    );
  };
