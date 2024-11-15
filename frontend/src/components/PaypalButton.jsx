import { PayPalButtons } from "@paypal/react-paypal-js";
import React from "react";
import { useMessage } from "../context/Message";
function PaypalButton({ totalPrice,bookPlace }) {
  const { setMessage } = useMessage();
  return (
    <>
      <PayPalButtons
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: totalPrice.toFixed(2),
                },
              },
            ],
          });
        }}
        onApprove={async (data, actions) => {
          const details = await actions.order.capture();
          bookPlace()
          console.log("Payment Details:", details);
           
          // Notify the user about successful payment
          setMessage("Payment successful!");

          // Redirect to the backend to finalize booking creation
          window.location.href = `/payment/success?paymentId=${details.id}`;
        }}
        onCancel={() => {
          setMessage("payment cancelled");
        }}
        onError={(err) => {
          console.log("PayPal error:", err);
          setMessage("An error occurred during the payment process.");
        }}
      />
    </>
  );
}

export default PaypalButton;
