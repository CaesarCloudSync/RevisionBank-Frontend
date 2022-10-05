import React from "react";
import {useLocation} from "react-router-dom";
function showData(pdf:any,index:any){
    if (index == 0){
        return(<p style={{color:"white"}}>{pdf}</p>)
    }
    else if (index % 3 == 0){
        return(<div></div>)
    }
    
    else if (pdf.includes("https")){
    return(<li><a  target="_blank" rel="noopener noreferrer" href={pdf}>{pdf}</a></li>)
    }
    else if (!pdf.includes("https")){
        return(<p style={{color:"white"}}>{pdf}</p>)
        }
    
}
function FmathSBPDF(){
    let location = useLocation();
    let fmathsbpdfresponse:any = location.state
    let fmathsbpdf = fmathsbpdfresponse.furthermathsbpdf.furthermathsmessage.split("<br>")
    let email = fmathsbpdfresponse.email
    let emailcount = (fmathsbpdfresponse.furthermathsbpdf.emailcount > 40) ? "Unlimited" : fmathsbpdfresponse.furthermathsbpdf.emailcount + 1
    let end_date_subscription = new Date(fmathsbpdfresponse.furthermathsbpdf.end_date_subscription).toString()
   
    console.log(fmathsbpdfresponse.furthermathsbpdf)
    return(
        <div>
        <h2 style={{color:"white"}}>FmathSBPDF</h2>
        <p style={{color:"white"}}>Further Maths Papers </p>
        <p style={{color:"white"}}>{email}</p>
        <p style={{color:"white"}}>Email Count: {emailcount}</p>
        <p style={{color:"white"}}>Email Count: {end_date_subscription}</p>
        
        <ul>
        {fmathsbpdf.map((pdf:any,index:any) => showData(pdf,index))}
        </ul>
        </div>
    )
}

export default FmathSBPDF;