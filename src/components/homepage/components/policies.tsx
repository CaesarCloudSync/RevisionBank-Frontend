import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
import './policies.css';
export default function Policies(props:any){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    return(
        <section className="wrapper">
        <div className="container" data-aos="fade-up" data-aos-duration="1000">
        <div style={{display: maxRowBased ? "flex" : "flex",gap:"10px", marginTop: maxRowBased ? props.marginTop: props.marginTopPh}}>
                <div><a style={{color:"grey",fontSize: maxRowBased ? "13px" : "5px"}} href='/termsofservice'>Terms of Service</a></div>
                <div><a style={{color:"grey",fontSize: maxRowBased ? "13px" : "5px"}} href='/privacypolicy'>Privacy Policy</a></div>
                <div><a style={{color:"grey",fontSize: maxRowBased ? "13px" : "5px"}} href='/cookiepolicy'>Cookie Policy</a></div>
        </div>
      </div>
      </section>

    )
}