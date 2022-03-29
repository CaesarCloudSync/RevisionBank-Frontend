import React from "react";
import {useLocation} from "react-router-dom";
function showData(pdf:any,index:any){
    if (index == 0){
        return(<p>{pdf}</p>)
    }
    else if (index % 3 == 0){
        return(<div></div>)
    }
    
    else if (pdf.includes("https")){
    return(<li><a  target="_blank" rel="noopener noreferrer" href={pdf}>{pdf}</a></li>)
    }
    else if (!pdf.includes("https")){
        return(<p>{pdf}</p>)
        }
    
}
function FmathSBPDF(){
    let location = useLocation();
    let fmathsbpdfresponse:any = location.state
    let fmathsbpdf = fmathsbpdfresponse.furthermathsbpdf.furthermathsmessage.split("<br>")
    let email = fmathsbpdfresponse.email
    let emailcount = (fmathsbpdfresponse.furthermathsbpdf.emailcount > 40) ? "Unlimited" : fmathsbpdfresponse.furthermathsbpdf.emailcount.furthermathspdf.emailcount
   
    return(
        <div>
        <h2>FmathSBPDF</h2>
        <p>Further Maths Papers </p>
        <p>{email}</p>
        <p>Email Count: {emailcount}</p>
        <ul>
        {fmathsbpdf.map((pdf:any,index:any) => showData(pdf,index))}
        </ul>
        </div>
    )
}

export default FmathSBPDF;