import React, {useState,useEffect} from "react";
import axios from "axios";
import { useNavigate,useLocation } from "react-router";
import { Button } from "@mui/material";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import Select from "react-select";
import {Chapter} from './physicsaqadata';
import {Topic} from './physicsaqadata';
import {TopicMS} from './physicsaqadata';
import {TopicSelectBar} from './physicsaqadata';
import { Navigate } from "react-router-dom";
interface ChapterTopic{
  label:string;
  value:string;
}
class PhysicsAqaStyles{
  containercenter:Object;
  containercentercol:Object;
  largecontainer :Object;
  inputbars:Object;
  textcolor:Object;
  title:Object;
  constructor(maxRowBased:any){
    this.title = maxRowBased ? {marginLeft: "10%",position:"relative",top:"30px",fontSize:"1.5em",fontWeight:"bold",color:"#3f51b5"} : {}
    this.textcolor = {color:"black"};
    this.containercenter = {display:"flex",justifyContent: maxRowBased ? "left" : "center",marginLeft:maxRowBased ? "2%": "auto",marginBottom: maxRowBased ? "2%" :"auto"};
    this.inputbars = {width: "100%",borderRadius:"5px",border:"1px solid grey"}
    this.containercentercol = {display: "flex",flexDirection: maxRowBased ? 'row' : 'column',alignItems: "center",justifyContent: maxRowBased ? "left":"center",marginTop: maxRowBased ? "5%" : "5%",marginLeft:maxRowBased ? "2%": "auto"};
    this.largecontainer = {backgroundColor:"white",margin: maxRowBased ? "10%" : "none",border: maxRowBased ?  "1px solid black" : "none", borderRadius: maxRowBased ? "10px" : "none",height:"40rem"} 
  }
}
export default function PhysicsAqa (){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const styles = new PhysicsAqaStyles(maxRowBased);
    let navigate = useNavigate();
    
    const location:any = useLocation() //.state
    const token = location.state
    const tokenbool = (token === null) ? false : true // false if token doesnot exist
    //const [pdfresponse,setPdfResponse] = useState('');
    const [email,setEmail] = useState('');
    const [emailisset,setEmailIsSet] = useState(false);
    const [physicsaqachapter, setPhysicsAQAChapter] = useState<any>({});
    const [physicsaqatopic,setPhysicsAQATopic] = useState<any>({});
    const [physicsaqatopicms,setPhysicsAQATopicMS] = useState<any>({});
    const [isLoading,setIsLoading] = useState(false);
    const [navigated,setNavigated] = useState(false);
    const [datanotset,setDataNotSet] = useState(false);
    const [pdfresposne,setPdfResponse] = useState("");
    const sendApi = async (e:any) => {
      //&& physicsaqatopicms
      if (physicsaqachapter && physicsaqatopic  !== {} && email !== '') {
      setDataNotSet(false);
      e.preventDefault();
      setIsLoading(true);
      const config = {headers: {Authorization: `Bearer ${token.token}`,}}
      const response:any = await axios.post("https://palondomus-api.herokuapp.com/physicsaqa",{"physicsaqa":{"email":email,"chapter":physicsaqachapter.label ,"topic":physicsaqatopic.label,"platform":"web"}},config)
      console.log(response.data)
      setIsLoading(false);
      navigate("/physicsaqa/pdf",{state:{"physicsaqapdf": response.data.physicsaqa,"email":email,"chapter":physicsaqachapter.label ,"topic":physicsaqatopic.label}});

      setNavigated(true);
    }
    else{
      setDataNotSet(true);
    }
  }

    useEffect(() => {
      setEmail("");
      setNavigated(false)
    }, [navigated])

    //console.log(TopicSelectBar.physicsaqadata[physicsaqachapter.label])
    //console.log(Topic)
    return (
      <div>
        { tokenbool ?
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
          <h2 style={{color:"#3f51b5"}}>PhysicsAqa Question Papers</h2>
        </div>
        <div style={styles.largecontainer}>
          <div style={Object.assign({},styles.containercenter,{marginTop:"10px"})}>
          <h2 style={styles.textcolor}>PhysicsAqaQP</h2>
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
          <div style={Object.assign({},styles.containercentercol,{marginTop: maxRowBased ? "0%" : "5%"})}>
          <p>{emailisset && <p>Email is set</p>}</p>
          </div>
          <div style={styles.containercenter}>
            <h3 style={styles.textcolor}>PhysicsAQA Chapter</h3>
          </div>
          <div style={styles.containercenter}>
              <Select options={Chapter} value={Chapter.find(obj => obj.value === physicsaqachapter)} onChange= {(e:any) => {setPhysicsAQAChapter(e);}}  ></Select>
          </div>
          <div style={styles.containercenter}>
            <h3 style={styles.textcolor}>PhysicsAQA Topic</h3>
          </div>
          <div style={styles.containercenter}>
          <Select options={TopicSelectBar.physicsaqadata[physicsaqachapter.label]} value={Topic.find(obj => obj.value === physicsaqatopic)} onChange= {(e:any) => {setPhysicsAQATopic(e)}}   ></Select>
          </div>

          <div style={Object.assign({},styles.containercenter,{marginTop:maxRowBased ? "20px":"auto",marginBottom:maxRowBased ? "20px":"auto"})}>
          <Button variant="contained" style={{fontSize:"13px"}} onClick={sendApi}>Submit</Button>
          </div>
          <div style={styles.containercenter}>
          <p>{isLoading && <p>Loading...</p>}</p>
          </div>
          <div style={styles.containercenter}>
            <p>{datanotset && <p>Select all options</p>}</p>
          </div>
        </div>
        </div>
        :
        <div>
        <Navigate to="/"/>
        </div>}
      </div>
    );
  };
