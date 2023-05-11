import { useLocation } from "react-router";
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks/mediamax";
import ManageRevisionCards from "../revisionbanknotecard/components/managerevisioncards";
export default function ComputerSciencePDF() {
    const maxRowBased = useMediaQuery(maxRowBasedquery)
    try{
        let location:any = useLocation()
        let computersciencepaper =location.state.computersciencepdf
        let computersciencelinkname = location.state.computersciencelinkname
        let token = location.state.token
        //style={{height:window.innerHeight}}
        return(
        <div >
            {maxRowBased ?
            <div >
                <div style={{display:"flex",width:"100%"}}>
                    <div style={{height:window.innerHeight,width:window.innerWidth }}>
                        <object>
                        <embed src={`data:application/pdf;base64,${computersciencepaper}`}  type="application/pdf" width={maxRowBased ? "100%" : "50"} height={maxRowBased ? "100%" : "50"}></embed>
                        </object>
                    </div>
                    <div style={{height:window.innerHeight,width:"800px",backgroundColor:"white",overflow:"scroll"}}>
                        <div style={{position:"relative",left:"50px",marginTop:"10px",marginBottom:"10px"}}>
                        <h2>RevisionBank Cards</h2>
                        </div>
                        <ManageRevisionCards token={token} splitscreen={true}></ManageRevisionCards>
                    </div>
                </div>
                
            </div>
            :
            <div>
            <h1 style={{position:"absolute",top:"20%","left":"20%",color:"white"}}>Download: {computersciencelinkname}</h1>
            <object >
            <embed src={`data:application/pdf;base64,${computersciencepaper}`}  type="application/pdf" width={maxRowBased ? "100%" : "50"} height={maxRowBased ? "100%" : "50"}></embed>
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