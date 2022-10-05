
//import './App.css';
import HeaderComponent from "../headers/headerhome"
import useMediaQuery from "../mediahooks/useMedia";
import { maxRowBasedquery } from "../mediahooks//mediamax";
import { useLocation,useNavigate } from 'react-router';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

export default function Payment(){
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
    const [checkout, setCheckout] = React.useState(false);
    //console.log(statevalue)
    function navbilling(){
        navigate("/billing",{state:{token:token,subscription:subscription,price:price,email:email}})
        

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
                    <Button style={{width:"250px",marginTop:"50px"}}onClick={() => {navbilling()}} className="checkout-button">Complete Subscription</Button>
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