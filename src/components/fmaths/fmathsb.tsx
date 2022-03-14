import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate ,useLocation} from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import { Navigate } from "react-router-dom";
class FmathSBStyles{
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
export default function FmathSB(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new FmathSBStyles(maxRowBased);
    let navigate = useNavigate();
    
    const location:any = useLocation() //.state
    const token = location.state
    const tokenbool = (token === null) ? false : true // false if token doesnot exist


    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    const [furthermathsbook,setFurthermathsbook]=useState("");
    const [furthermathsbookid,setFurthermathsbookid] = useState("");
    const [furthermathsyear,setFurthermathsyear] = useState("");
    const [furthermathsexerciesNum,setFurthermathsexerciseNum] = useState("");
    const [pdfresponse,setPdfResponse] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    const sendApi = async (e:any) => {
        e.preventDefault();
        //console.log("name",name);
        setIsLoading(true);
        const response:any = await axios.post("https://palondomus-api.herokuapp.com/fmathsb",{"furthermathsb":{"email":email,"furthermathsbbook": furthermathsbook,"furthermathsbyear":furthermathsyear,"furthermathsbexercise":furthermathsexerciesNum,"platform":"web"}})
        //console.log("pdfresponse",response.data.furthermathsresult);
        setPdfResponse(response.data.furthermathsresult)
        setIsLoading(false);
        navigate("/fmathsb/pdf",{state:{"furthermathsbpdf": response.data.furthermathsresult,"email":email}});
        //navigation.navigate('furthermathsb', {"furthermathsbpdf": response.data.furthermathsresult,"email":email});
        setNavigated(true);
      }
    //console.log(pdfresponse)
    useEffect(() => {
        setEmail("");
        setFurthermathsbook("")
        setFurthermathsbookid("");
        setNavigated(false)
        setFurthermathsyear("");
        setFurthermathsexerciseNum("");
      }, [navigated])
    return(
        <div >
          {tokenbool ?
          <div>
            <div style={Object.assign({},styles.containercenter,styles.title)}>
            <h2 style={styles.textcolor}>FurtherMathSBScraper</h2>
            </div>
            <div style={styles.largecontainer}>
            <div style={styles.containercenter}>
                <h2 style={styles.textcolor}>FMathsSB</h2>
            </div>
            <div style={styles.containercenter}>
            <form onSubmit ={(e) => {e.preventDefault(); setEmailIsSet(true)}}>
            <input
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                placeholder="Enter email"
                
                />
            </form>
            </div>
            <div style={styles.containercentercol}>
                <p>{emailisset && <p>Email is set</p>}</p>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("0"); setFurthermathsbookid("Pure Maths")}}><p>Pure Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("1"); setFurthermathsbookid("Statistics-Mechanics")}}><p>Statistics-Mechanics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("2"); setFurthermathsbookid("Core-Pure-Maths")}}><p>Core-Pure-Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("3"); setFurthermathsbookid("Further-Pure-Maths")}}><p>Further-Pure-Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("4"); setFurthermathsbookid("Further-Statistics")}}><p>Further-Statistics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("5"); setFurthermathsbookid("Further-Mechanics")}}><p>Further-Mechanics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("6"); setFurthermathsbookid("Decision-Maths")}}><p>Decision Maths</p></Button>
                <p>{ furthermathsbook && <p>Further Maths Book Selected {furthermathsbookid}</p>}</p>
                </div>
                <div style={styles.containercenter}>
                    <h3 style={styles.textcolor}>FMaths Topic</h3>
                </div>
                <div style={styles.containercenter}>
                <input
                onChange={(e) => setFurthermathsyear(e.target.value)}
                value={furthermathsyear}
                placeholder="Enter Further Maths Year/Book"
                />
                </div>
                <div style={styles.containercenter}>
                
                <form onSubmit={(e) => sendApi(e)}>
                <input
                onChange={(e) => setFurthermathsexerciseNum(e.target.value)} 
                value={furthermathsexerciesNum}
                placeholder="Enter Further Maths Exercise Number"
                />
                </form>
                <p>{isLoading && <p>Loading...</p>}</p>
                </div>
        </div>
        </div>:
        <div>
        <Navigate to="/"/>
        </div>}
        </div>
    )
}