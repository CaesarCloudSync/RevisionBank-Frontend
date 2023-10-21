import React from "react";
import { useNavigate } from "react-router-dom";
import { paypal } from "./paypalinterface";
import axios from "axios";
export default function ReactPayPal(props:any) {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef:any = React.useRef();
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


  // To show PayPal buttons once the component loads
  //console.log(props.price)
  console.log(props.subscription)
  React.useEffect(() => {
    paypal
      .Buttons({
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `${props.subscription.replace(/^\w/, (c:string) => c.toUpperCase())} Subscription.`,
                amount: {
                  currency_code: "GBP",
                  value: props.price,
                },
              },
            ],
          });
        },
        onApprove: async (data:any, actions:any) => {
          const order = await actions.order.capture();
          setPaid(true);
          //console.log(order);
        },
        onError: (err:any) => {
        //   setError(err),
          console.error(err);
        },
      })
      .render(paypalRef.current);
  }, []);

  // If the payment has been made
  if (paid) {
    // TODO Call storeSubscriptionData() to store the subscription data in the database.
    console.log("Payment Successful")
    storeSubscriptionData(props.subscription,start_date,end_date,props.token)
    navigate("/revisionbank", { state: { token: props.token, subscription: props.subscription,email:props.email} });
    return <div>Payment successful.!</div>;
  }

  // If any error occurs
  if (error) {
    return <div>Error Occurred in processing payment.! Please try again.</div>;
  }

  // Default Render
  return (
    <div>
      <div style={{width:"300px"}} ref={paypalRef} />
    </div>
  );
}
