import {privacypolicytext} from './privacypolicytext';
export default function PrivacyPolicy(){
    return(
        <div className="terms-and-services">
        <div style={{position:"absolute",left:"2%",top:"5%"}}>
            <div style={{display:"flex"}}>
            <div dangerouslySetInnerHTML={{ __html: privacypolicytext }}></div>
            </div>
        </div>
        </div>
    )
}