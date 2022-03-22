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
  const end_date = new Date(start_date.getFullYear(), start_date.getMonth()+1,start_date.getDate()).toISOString()
  start_date = start_date.toISOString()
  const storeSubscriptionData = async (subscription:string,start_date:string,end_date:string,token:any) => {
    var json = {"subscription":subscription,"start_date_subscription":start_date,"end_date_subscription":end_date}
    const config = {headers: {Authorization: `Bearer ${token}`,}}
    const response:any = await axios.post(`https://palondomus-api.herokuapp.com/storesubscription`, json,config); // Send login post request.
  }


  // To show PayPal buttons once the component loads
  //console.log(props.price)
  React.useEffect(() => {
    paypal
      .Buttons({
        createOrder: (data:any, actions:any) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Your description",
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
    storeSubscriptionData(props.subscription,start_date,end_date,props.token)
    navigate("/stemscraper", { state: { token: props.token, subscription: props.subscription,email:props.email} });
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
