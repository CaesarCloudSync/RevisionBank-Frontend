import {useNavigate } from 'react-router';
import { Button } from 'react-bootstrap';
import useMediaQuery from "../../mediahooks/useMedia";
import { maxRowBasedquery } from "../../mediahooks/mediamax";
export default function DeleteButtons(props:any){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const navigate = useNavigate();
    return(
        <div style={{display:"flex",flexDirection:"column",alignItems:"center",width:"100%",marginTop:"50px"}}> 
        <div style={{marginTop:"50px"}}>
        <h1 style={{color:"white",marginBottom:"20px"}}>Delete your Account/Subscription</h1>
        </div>
        <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "60%" :"80%",height:maxRowBased ? "10vh" : "10vh",marginTop:"10px"}}>
        <div style={{position:"relative",left: maxRowBased ? "15%" :"0",top:"15%"}}>
        <div style={{display:"flex",gap:maxRowBased ? "20%" : "5%"}}>
        {/*TODO Show an "Are you sure you want to delete account?" Higher z-index. absolute postion. right in the middle of page.*/}
        <Button onClick={() => navigate("/confirmdeleteaccount",{state:{"token":props.token}})} style={{backgroundColor:"#dc3545",width:"200px",border:"1px solid #dc3545 "}}>Delete Account</Button>
        <Button onClick={() => navigate("/confirmdeletesubscription",{state:{"token":props.token}})} style={{backgroundColor:"#ffc107",color:"black",width:"200px",border:"1px solid #ffc107 "}}>Delete Subscription</Button>
        </div>
        </div>
        
        </div>
    </div>
    )
}