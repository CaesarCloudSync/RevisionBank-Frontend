import ReactPayPal from "./paypal"
import { Navigate } from "react-router";
import { useLocation,useNavigate } from 'react-router';
import React, { useState } from "react";
import "./stripecheckoutform.css"
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripe = loadStripe("pk_live_51La4WnLpfbhhIhYRtajDrQN6hg1Ykin8vKIrptIm0pGoOFNgoU7x0DeTSDX6wq5JTNyRgkICNxL3Bj5d0W5uxa1w00kSscjXNz")
//("pk_test_51La4WnLpfbhhIhYRRq1OTZQNpXqjvPY6TY9rx7SjHOhVN5oOSBFaasDvdgAdQBKKHIoWikfkjYMn0DR3hB4sJS2q00vi7W5hLE") 

//
// https://blog.logrocket.com/integrating-stripe-react-stripe-js/
export default function Billing(){
    const location:any = useLocation() //.state
    const statevalue:any = location.state
    const statebool = (statevalue === null) ? false : true // false if token doesnot exist
    const token = (statevalue !== null) ? statevalue.token : "" 
    const subscription = (statevalue !== null) ? statevalue.subscription : "" 
    
    const price = (statevalue !== null) ? statevalue.price : "" 
    //console.log(price)
    const email = (statevalue !== null) ? statevalue.email : "" 
    //console.log(statevalue)

    class BillingStyles{
        container:Object;
        textcolor:Object;
        marginbot:Object;
        containerposition:Object;
        constructor(){
            this.marginbot = {marginBottom:"10px"}
            this.textcolor = {color:"white"}
            this.container = {display:"flex",justifyContent: "center",marginTop:"10%",textAlign:"left",alignItems:"center",gap:"30px",flexDirection:"column",width:"100%"}
            this.containerposition = {position:"relative",top:"50%"}
        }
    }
    const styles = new BillingStyles();
    


    //<ReactPayPal price={price} token ={token} subscription={subscription} email={email}/>
    return(
        <div> 
        { statebool ? 
        <div>
            <div style={{position:"relative",top:"100px"}}>
            <div style={styles.containerposition}>
                <div style={styles.container}>
                    <div>
                        <h2 style={styles.textcolor}>Start Studying Now</h2> 
                    </div>
                    <div style={{textAlign:"left"}}>
                        <h2 style={styles.textcolor}>Unlimited Question Papers and Markschemes £{price}/{subscription === "educational" ? price < 3000 ? price > 1000 ? "6 months": price < 400 ? "month" : "3 months" :"year": "month" }</h2> 
                    </div>
                    <Elements stripe={stripe}>
                        <CheckoutForm price={price} token={token} subscription={subscription} email={email}/>
                    </Elements>


                    
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


function CheckoutForm(props:any) {

  const [isPaymentLoading, setPaymentLoading] = useState(false);
  const stripe = useStripe();
  const elements:any = useElements();
  const navigate = useNavigate();
  let start_date:any = new Date()
  const month = new Date(start_date.getFullYear(), start_date.getMonth()+1,start_date.getDate()).toISOString()
  const year = new Date(start_date.getFullYear()+1, start_date.getMonth(),start_date.getDate()).toISOString()
  const threemonths = new Date(start_date.getFullYear(), start_date.getMonth()+3,start_date.getDate()).toISOString()
  const sixmonths = new Date(start_date.getFullYear(), start_date.getMonth()+6,start_date.getDate()).toISOString()
  const end_date = props.subscription === "educational" ? props.price < 3000 ? props.price > 1000 ? sixmonths : props.price < 400 ? month : threemonths :year: month
  //const end_date = new Date(start_date.getFullYear(), start_date.getMonth()+1,start_date.getDate()).toISOString()
  start_date = start_date.toISOString()
  const storeSubscriptionData = async (subscription:string,start_date:string,end_date:string,token:any) => {
    var json = {"subscription":subscription,"start_date_subscription":start_date,"end_date_subscription":end_date}
    const config = {headers: {Authorization: `Bearer ${token}`,}}
    const response:any = await axios.post(`http://192.168.0.22:8080/storesubscription`, json,config); // Send login post request.
  }
  const payMoney = async (e:any) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setPaymentLoading(true);
    const getClientSecret = async (price:any) => { 
        const json = {"price":price}
        const config = {headers: {Authorization: `Bearer ${props.token}`,}}
        const response:any = await axios.post(`http://192.168.0.22:8080/revisionbankstripepayment`, json,config); // Send login post request.
        //console.log(response.data)
        return response.data.clientsecret
        

        };
    const clientSecret:any = await getClientSecret(props.price);

    const paymentResult = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `RevisionBank ${props.subscription} for £${props.price}`,
        },
      },
    });
    setPaymentLoading(false);
    if (paymentResult.error) {
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded") {
        //console.log("Payment Successful")
        //console.log(props.subscription,start_date,end_date,props.token)
        storeSubscriptionData(props.subscription,start_date,end_date,props.token)
        navigate("/revisionbank", { state: { token: props.token, subscription: props.subscription,email:props.email} });
        return <div>Payment successful.!</div>;
        //alert("Success!");
      }
    }
  };

  return (
    <div
      style={{
        width:"500px",
        padding: "3rem",
      }}
    >
      <div
        style={{
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <form
          style={{
            display: "block",
            width: "100%",
          }}
          onSubmit = {payMoney}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <CardElement
              className="card"
              options={{
                style: {
                  base: {
                    backgroundColor: "white"
                  } 
                },
              }}
            />
            <button
              className="pay-button"
              disabled={isPaymentLoading}
            >
              {isPaymentLoading ? "Loading..." : "Pay Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
<StripeCheckout
image="RevisionBankLogo.png"
label="Buy Now"
name="RevisionBank Subscription"
billingAddress
shippingAddress
description={`Your total is ${price}`}
amount={price*100}
token={onToken}
stripeKey={publishable_key}
>


</StripeCheckout> */