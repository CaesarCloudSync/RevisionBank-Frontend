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
    return(<li><a style={{color:"white"}} target="_blank" rel="noopener noreferrer" href={pdf}>{pdf}</a></li>)
    }
    else if (!pdf.includes("https")){
        return(<p style={{color:"white"}}>{pdf}</p>)
        }
    
}
function FmathQPDF(){
    let location = useLocation();
    let fmathpdfresponse:any = location.state
    let fmathpdf = fmathpdfresponse.furthermathspdf.furthermathsmessage.split("<br>")
    let email = fmathpdfresponse.email
    let emailcount = (fmathpdfresponse.furthermathspdf.emailcount > 40) ? "Unlimited" : fmathpdfresponse.furthermathspdf.emailcount
    //console.log(fmathpdfresponse)
    return(
        <div>
        <h1 style={{color:"white"}}>FmathQPDF Page</h1>
        <p style={{color:"white"}}>Further Maths Papers </p>
        <p style={{color:"white"}}>{email}</p>
        <p style={{color:"white"}}>Email Count: {emailcount}</p>
        <ul>
        {fmathpdf.map((pdf:any,index:any) => showData(pdf,index))}
        </ul>
        </div>
    )

}

export default FmathQPDF