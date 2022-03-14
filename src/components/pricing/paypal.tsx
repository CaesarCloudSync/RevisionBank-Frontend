import React from "react";
import { paypal } from "./paypalinterface";

export default function ReactPayPal(props:any) {
  const [paid, setPaid] = React.useState(false);
  const [error, setError] = React.useState(null);
  const paypalRef:any = React.useRef();

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
          console.log(order);
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
