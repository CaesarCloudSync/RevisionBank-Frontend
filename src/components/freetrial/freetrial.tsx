//import './App.css';
import HeaderComponent from "../headers/headerhome"
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks//mediamax";
import { useLocation,useNavigate } from 'react-router';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import axios from "axios";

export default function CompleteFreeTrial(){
    const maxRowBased = useMediaQuery(maxRowBasedquery);
    //const styles = new RevisionBankOptionsStyles(maxRowBased);
    let navigate:any = useNavigate();
    const location:any = useLocation() //.state
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : "" 
    const subscription = (statevalue !== null) ? statevalue.subscription : "" 
    const price = (statevalue !== null) ? statevalue.price : "" 
    const email = (statevalue !== null) ? statevalue.email : ""
    //const [checkout, setCheckout] = React.useState(false);
    //console.log(statevalue)
    const navbank = async () => {
        let start_date_freetrial:any = new Date()
        const end_date_freetrial = new Date(start_date_freetrial.getFullYear(), start_date_freetrial.getMonth()+1,start_date_freetrial.getDate() ).toISOString()
        //
        var json:any = {"subscription":subscription,"start_date_subscription":start_date_freetrial,"end_date_subscription":end_date_freetrial}
        const config = {headers: {Authorization: `Bearer ${token}`,}}
        const responseft:any = await axios.post(`http://127.0.0.1:8080/storefreetrial`,json,config)
        navigate("/revisionbank", { state: { token: token, subscription: subscription,email:email} });
        //navigate("/billing",{state:{token:token,subscription:subscription,price:price,email:email}})
        

    }
    class PaymentStyles{
        container:Object;
        textcolor:Object;
        constructor(){
            this.textcolor = {color:"white"}
            this.container = {display:"flex",justifyContent: "left" ,marginTop:"10%",marginLeft:"10%"}
        }
    }
    const styles = new PaymentStyles();
    
    return(
        <div>
            { statebool ? 
            <div>
            <HeaderComponent/>
            <div style={styles.container} >
                <div style={{width:"100%"}}>
                    <h1 style={Object.assign({},styles.textcolor,{fontSize:"30px"})}>RevisionBank {subscription.replace(/^\w/, (c:any) => c.toUpperCase())} Checkout</h1>
                    <p style={Object.assign({},styles.textcolor,{fontSize:"20px"},{marginTop:"30px"})}>Please complete your subscription to start using RevsionBank {subscription.replace(/^\w/, (c:any) => c.toUpperCase())}</p>
                    <div style={{display:"flex",gap:"30px"}}> 
                    <Button style={{width:"250px",marginTop:"50px"}}onClick={() => {navbank()}} className="checkout-button">Complete Subscription</Button>
                    <Button style={{width:"250px",marginTop:"50px"}}onClick={() => {navigate("/revisionbank",{state:{"token":token,"email":email}})}} className="checkout-button">Don't Redeem Free trial</Button>
                    </div>
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