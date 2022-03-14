import React from "react";
import {useLocation} from "react-router-dom";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";

function OCRSciencePDF(){
    let location = useLocation();
    let scienceocr:any = location.state
    let ocrsciencepdf = scienceocr.ocrsciencepdf;
    let scienceocranswers = ocrsciencepdf.scienceocranswers
    let email = scienceocr.email
    let query = `${scienceocr.subject.replace(/^\w/, (c:string) => c.toUpperCase())} ${scienceocr.physicsocralph} ${scienceocr.year}`
    let chapter = scienceocr.chapter.replace(/^\w/, (c:string) => c.toUpperCase())
    //console.log(query);
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
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    let styles = new PhysicsAQAPDFStyles(maxRowBased)
    return(
        <div>
        <div>
        <div style={Object.assign({},styles.containercenter,styles.title)}>
        <h1 style={styles.textcolor}>Physics, Biology and Chemistry OCR</h1>
        </div>
        <div style={styles.largecontainer}>
          <div style={styles.containercenter}>
            <h2 style={styles.textcolor}>PhysicsAqaQP</h2>
          </div>
          <div style={styles.containercenter}>
            <p style={styles.textcolor}>Email sent to: {email}</p>
          </div>
          <div style={styles.containercenter}>
            <h2 style={styles.textcolor}><u> PhysicsAQA Question Paper</u></h2>
          </div>
          <div style={styles.containercenter}>
            <a href={scienceocranswers}  target="_blank" rel="noopener noreferrer" style={{color:"white",textDecoration:"none"}}><p ><u>{query}: {chapter}</u></p></a>
          </div>

        </div>
      
        
        
        
        
        
        </div>
        </div>
    )
}

export default OCRSciencePDF;