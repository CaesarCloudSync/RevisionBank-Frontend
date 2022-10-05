import { cookiepolicytext } from "./cookiepolicytext"
export default function CookiePolicy(){
    return(
        <div className="terms-and-services">
        <div style={{position:"absolute",left:"5%",top:"50px"}}>
            <div style={{display:"flex"}}>
            <div dangerouslySetInnerHTML={{ __html: cookiepolicytext }}></div>
            </div>
        </div>
        </div>
    )
}