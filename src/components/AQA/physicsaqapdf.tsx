import React from "react";
import {useLocation} from "react-router-dom";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";

class PhysicsAQAPDFStyles{
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
function PhysicsAQAPDF(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    let styles = new PhysicsAQAPDFStyles(maxRowBased)
    let location = useLocation();
    let physicsqaqapdfresponse:any = location.state
    let questionpaper = physicsqaqapdfresponse.physicsaqapdf["question paper"] 
    let markscheme = physicsqaqapdfresponse.physicsaqapdf.markscheme //.furthermathsmessage.split("<br>")
    let email = physicsqaqapdfresponse.email
    let chapter = physicsqaqapdfresponse.chapter
    let topic = physicsqaqapdfresponse.topic
    let topicms = `${topic} MS`   
    let emailcount = (physicsqaqapdfresponse.physicsaqapdf.emailcount.furthermathspdf.emailcount > 40) ? "Unlimited" : physicsqaqapdfresponse.physicsaqapdf.emailcount.furthermathspdf.emailcount
    
    //const textcolor = {color:"white"}
    //console.log(physicsqaqapdfresponse)
    return(
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
        <h1 style={styles.textcolor}>FmathQPDF Page</h1>
        </div>
        <div style={styles.largecontainer}>
          <div style={styles.containercenter}>
            <h2 style={styles.textcolor}>PhysicsAqaQP</h2>
          </div>
          <div style={styles.containercenter}>
            <p style={styles.textcolor}>Email sent to: {email}</p>
          </div>
          <div style={styles.containercenter}>
            <p style={styles.textcolor}>Email Count: {emailcount}</p>
          </div>
          <div style={styles.containercenter}>
            <p style={styles.textcolor}>{chapter}</p>
          </div>
          <div style={styles.containercenter}>
            <p style={styles.textcolor}><u> PhysicsAQA Question Paper</u></p>
          </div>
          <div style={styles.containercenter}>
            <a href={questionpaper}  target="_blank" rel="noopener noreferrer"><p style={{color:"white",textDecoration:"none"}}>{topic}</p></a>
          </div>
          <div style={styles.containercenter}>
          <p style={styles.textcolor}> <u>PhysicsAQA Mark Scheme</u></p>
          </div>
          <div style={styles.containercenter}>
          <a href={markscheme}  target="_blank" rel="noopener noreferrer"><p style={{color:"white",textDecoration:"none"}}>{topicms}</p></a>
          </div>
        </div>
      
        
        
        
        
        
        </div>

        
    )

}

export default PhysicsAQAPDF