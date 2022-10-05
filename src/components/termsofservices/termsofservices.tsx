// Termly - Terms of Service Generator
// Termly Website - https://termly.io/products/terms-and-conditions-generator/ 
// Termly Account - https://app.termly.io/dashboard/website/3b144122-ddf7-4266-85ad-e20c148f8eb0/terms-of-service

// TODO Create Privacy Policy and Cookie Policy
import { termsofServicestext } from "./termsofservicestext"
export default function TermsOfServices(){
    return(
        <div className="terms-and-services">
        <div style={{position:"absolute",left:"5%",top:"50px"}}>
            <div style={{display:"flex"}}>
            <div dangerouslySetInnerHTML={{ __html: termsofServicestext }}></div>
            </div>
        </div>
        </div>
    )
}