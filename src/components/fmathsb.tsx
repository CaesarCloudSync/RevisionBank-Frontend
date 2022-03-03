import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
export default function FmathSB(){
    let navigate = useNavigate();
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
            <h2>FMathsSB</h2>
            <form onSubmit ={(e) => {e.preventDefault(); setEmailIsSet(true)}}>
            <input
                onChange={(e) => setEmail(e.target.value)} 
                value={email}
                placeholder="Enter email"
                
                />
            </form>
                <p>{emailisset && <p>Email is set</p>}</p>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("0"); setFurthermathsbookid("Pure Maths")}}><p>Pure Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("1"); setFurthermathsbookid("Statistics-Mechanics")}}><p>Statistics-Mechanics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("2"); setFurthermathsbookid("Core-Pure-Maths")}}><p>Core-Pure-Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("3"); setFurthermathsbookid("Further-Pure-Maths")}}><p>Further-Pure-Maths</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("4"); setFurthermathsbookid("Further-Statistics")}}><p>Further-Statistics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("5"); setFurthermathsbookid("Further-Mechanics")}}><p>Further-Mechanics</p></Button>
                <Button variant= "contained" onClick={() => {setFurthermathsbook("6"); setFurthermathsbookid("Decision-Maths")}}><p>Decision Maths</p></Button>
                <p>{ furthermathsbook && <p>Further Maths Book Selected {furthermathsbookid}</p>}</p>
                <input
                onChange={(e) => setFurthermathsyear(e.target.value)}
                value={furthermathsyear}
                placeholder="Enter Further Maths Year/Book"
                />
                
                <form onSubmit={(e) => sendApi(e)}>
                <input
                onChange={(e) => setFurthermathsexerciseNum(e.target.value)} 
                value={furthermathsexerciesNum}
                placeholder="Enter Further Maths Exercise Number"
                />
                </form>
                <p>{isLoading && <p>Loading...</p>}</p>
    
        </div>
    )
}