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
      this.containercenter = {display:"flex",justifyContent: maxRowBased ? "left" : "center",marginLeft:maxRowBased ? "2%": "auto",marginTop:"20px"};
      this.inputbars = {width: "100%"}
      this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'column' : 'column',alignItems: maxRowBased ? "left":"center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "5%" : "5%",marginLeft:maxRowBased ? "2%": "auto",width:maxRowBased ?  "20%" : "auto",gap:"10px"};
      this.largecontainer = {backgroundColor:"white",margin: maxRowBased ? "10%" : "30px",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "10px",height: maxRowBased ? "60rem" : "auto"} 
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
    const [paperNotExist,setPaperNotExist] = useState(false);
    const sendApi = async (e:any) => {
        e.preventDefault();
        //console.log("name",name);
        setIsLoading(true);
        const config = {headers: {Authorization: `Bearer ${token.token}`,}}
        try{
        const response:any = await axios.post("https://palondomus-api.herokuapp.com/fmathsb",{"furthermathsb":{"email":email,"furthermathsbbook": furthermathsbook,"furthermathsbyear":furthermathsyear,"furthermathsbexercise":furthermathsexerciesNum,"platform":"web"}},config)
        
        if ('error' in response.data){
            //console.log("error",response.data.error)
            setIsLoading(false);
            setPaperNotExist(true)
        }
        else if (!('error' in response.data)){
          setPdfResponse(response.data.furthermathsresult)
          setIsLoading(false);
          navigate("/fmathsb/pdf",{state:{"furthermathsbpdf": response.data.furthermathsresult,"email":email}});
          setNavigated(true);

        }
        
        }catch(err){
            console.log(err);
            setIsLoading(false);
            //setNavigated(true);
        }
      }
    //console.log(pdfresponse)
    //onSubmit ={(e) => {e.preventDefault(); setEmailIsSet(true)}}
    useEffect(() => {
        setEmail("");
        setEmailIsSet(false);
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
            <h2 style={styles.textcolor}>FurtherMathSolution Bank</h2>
            </div>
            <div style={styles.largecontainer}>

            <div style={styles.containercenter}>
            <form >
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
                <div style={Object.assign({},styles.containercenter,{width:"100%"})}>
                  <input style={{marginLeft:maxRowBased ? "auto" :"70px",width:"100%"}}
                  onChange={(e) => setFurthermathsyear(e.target.value)}
                  value={furthermathsyear}
                  placeholder="Enter Further Maths Year/Book"
                  />
                </div>
                <div style={Object.assign({},styles.containercenter,{width:"100%"})}>               
                  <form onSubmit={(e) => sendApi(e)}>
                    <input
                    onChange={(e) => setFurthermathsexerciseNum(e.target.value)} 
                    value={furthermathsexerciesNum}
                    placeholder="Enter Further Maths Exercise Number"
                    />
                  </form>
                </div>
                <div style={Object.assign({},styles.containercenter,{width:"100%"})}>
                <p>{isLoading && <p>Loading...</p>}</p>
                <p>{paperNotExist && <p>Paper Does not exist</p>}</p>
                </div>
            </div>

        </div>
        </div>:
        <div>
        <Navigate to="/"/>
        </div>}
        </div>
    )
}