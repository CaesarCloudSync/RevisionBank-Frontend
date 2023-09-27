import HeaderScraper from "../headers/headerscraper"
import { useLocation,useNavigate } from "react-router"
import { Navigate } from "react-router-dom"
import { Button } from "react-bootstrap"
import useMediaQuery from "../mediahooks/useMedia"
import { maxRowBasedquery } from "../mediahooks/mediamax"
import Policies from "../homepage/components/policies"
import axios from "axios"
import { useState } from "react"
export default function ConfirmDeleteSubscription(){
    const location:any = useLocation() 
    const navigate = useNavigate();
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : "" 
    const maxRowBased = useMediaQuery(maxRowBasedquery)
    const deletesubscription = async (token:any) => {
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const response:any = await axios.delete(`https://revisionbankbackend-aoz2m6et2a-uc.a.run.app/deletesubscription`,config); 
        //navigate('/account',{state:{token:token}})
        navigate('/')
      }
    return(
        
        <div>
            {statebool ? 
            <div>
            <HeaderScraper token={token} />
            <div style={{ display: "flex",justifyContent: "center",marginTop:"50px",flexDirection:"column",alignItems:"center",marginBottom:"20px"}}>
            <div>
                <h1 style={{color:"white",marginBottom:"20px"}}>Confirm Delete Subscription</h1>
                </div>
                <div style={{position:"relative",border:"3px white solid",borderRadius:"10px",backgroundColor:"white",width: maxRowBased ? "60%" :"80%",height:maxRowBased ? "30vh" : "50vh"}}>
                    <div style={{position:"relative",left:"10%",top:"10%",width: "80%",borderRadius:"5px"}}>
                        <div style={{display:"flex",justifyContent:"left",alignItems:"left",flexDirection:"column",gap:"30px"}}>
                            <strong>Confirm Subscription Deletion</strong>
                            <p>This action cannot be reversed!</p>
                            
                            <Button onClick={() => deletesubscription(token)} style={{backgroundColor:"#ffc107",color:"black",width:"200px",border:"1px solid #ffc107 "}}>Delete Subscription</Button>
                            
                        </div>
                    </div>
                </div>
                
                <div style={{display:"flex"}}>
            <Policies margetop="80px"></Policies>
            </div>
            </div>
            </div>
            :
            <div>
                <Navigate to="/"/>
            </div>
                }
        </div>
    )
}