import React from "react";
import {useLocation} from "react-router-dom";
function showData(fmathpdf:any,pdf:any,index:any){
    if (index == 0){
        return(<p style={{color:"white"}}>{pdf}</p>)
    }
    else if (index % 3 == 0){
        return(<div></div>)
    }
    
    else if (pdf.includes("https")){
    return(<div></div>) // <li style={{marginBottom:"20px"}}><a style={{color:"white"}} target="_blank" rel="noopener noreferrer" href={pdf}>{pdf}</a></li>
    }
    else if (!pdf.includes("https")){
        return(<a style={{color:"white"}} target="_blank" rel="noopener noreferrer" href={fmathpdf[index+1]}>{pdf}</a>)
        }
    
}
function parseISOString(s:any) {
    var b = s.split(/\D+/);
    return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
  }
function FmathQPDF(){
    let location = useLocation();
    let fmathpdfresponse:any = location.state
    let fmathpdf = fmathpdfresponse.furthermathspdf.furthermathsmessage.split("<br>")
    let email = fmathpdfresponse.email
    let emailcount = (fmathpdfresponse.furthermathspdf.emailcount > 40) ? "Unlimited" : fmathpdfresponse.furthermathspdf.emailcount +1
    let end_date_subscription = new Date(fmathpdfresponse.furthermathspdf.end_date_subscription).toString()
    //console.log(fmathpdfresponse)
    return(
        <div>
        <h1 style={{color:"white"}}>FmathQPDF Page</h1>
        <p style={{color:"white"}}>Further Maths Papers </p>
        <p style={{color:"white"}}>{email}</p>
        <p style={{color:"white"}}>Email Count: {emailcount}</p>
        <p style={{color:"white"}}>Subscription Expiry: {end_date_subscription}</p>
        <ul>
        {fmathpdf.map((pdf:any,index:any) => showData(fmathpdf,pdf,index))}
        </ul>
        </div>
    )

}

export default FmathQPDF