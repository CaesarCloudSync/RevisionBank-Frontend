
import useMediaQuery from "../mediahooks/useMedia"
import { maxRowBasedquery } from "../mediahooks/mediamax"
import { Button } from "@mui/material";
import { useNavigate,useLocation } from "react-router";
export default function FreeTrialAuth() {
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    const navigate = useNavigate();
    return(
        <div>
        <div style={{display:"flex",justifyContent: "left" ,marginTop:"10%",marginLeft:"10%"}} >
        <div style={{width:"100%"}}>
            <h1 style={Object.assign({},{color:"white"},{fontSize:"30px"})}>Start Freetrial Now!</h1>
            <p style={Object.assign({},{color:"white"},{fontSize:"20px"},{marginTop:"30px"})}>Please signup/signin to start your RevsionBank freetrial</p>
            <div style={{display:"flex",gap:"30px",flexDirection:"column"}}> 
                <Button style={{width:"250px",marginTop:"50px"}} variant="contained" onClick={() => {navigate('/signup',{state:{"subscription":"freetrial"}})}}><p style={{fontSize:"15px"}}>Signup</p></Button>
                <Button style={{width:"250px"}} variant="contained" onClick={() => {navigate('/signin',{state:{"subscription":"freetrial"}})}}><p style={{fontSize:"15px"}}>Signin</p></Button>
            </div>
            </div>
            
            
        </div>
        </div>

                           

    )
}