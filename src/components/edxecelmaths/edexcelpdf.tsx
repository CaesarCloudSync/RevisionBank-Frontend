import { useLocation } from "react-router";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
export default function EdexcelPdf() {
    const maxRowBased = useMediaQuery(maxRowBasedquery)
    try{
        let location:any = useLocation()
        let edexcelpaper =location.state.edexcelpdf
        let edexcelinkname = location.state.edexcelinkname
        return(
        <div style={{height:window.innerHeight}}>
            {maxRowBased ?
            
            <object>
            <embed src={`data:application/pdf;base64,${edexcelpaper}`}  type="application/pdf" width={maxRowBased ? "100%" : "50"} height={maxRowBased ? "100%" : "50"}></embed>
            </object>
            :
            <div>
            <h1 style={{position:"absolute",top:"20%","left":"20%",color:"white"}}>Download: {edexcelinkname}</h1>
            <object >
            <embed src={`data:application/pdf;base64,${edexcelpaper}`}  type="application/pdf" width={maxRowBased ? "100%" : "50"} height={maxRowBased ? "100%" : "50"}></embed>
            </object>
            </div>}
  
        </div>
        ) 
    }
    catch (e){
        console.log(e)
       return(
           <div>
               <div style={{position:"relative",top:"300px"}}>
                    <div style={{display:"flex",justifyContent:"center"}}>
                        <h2 style={{color:"white"}}>Paper Does Not Exist</h2>
                    </div>
               </div>
           </div>
       )

    }
}