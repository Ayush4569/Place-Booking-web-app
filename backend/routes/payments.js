import { Router } from "express";
import { Booking } from "../models/bookings.js";
import { paypal } from "../services/paypal.js";
const route = Router();

route.post("/", async (req, res) => {
  console.log("res-body", req.body);
  let { totalPrice,bookingDetails } = req.body;

  let create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal",
    },
    "redirect_urls": {
      "return_url": `http://localhost:4000/payment/success`,
      "cancel_url": "http://localhost:4000/payment/failed",
    },
    "transactions": [
      {
        "item_list": {
          "items": [
            {
              "name": "item",
              "sku": "item",
              "price": totalPrice.toFixed(2).toString(),
              "currency": "USD",
              "quantity": 1,
            },
          ],
        },
        "amount": {
          "currency": "USD",
          "total": totalPrice.toFixed(2).toString(),
        },
        "description": "This is the payment description",
      },
    ],
  };

  try {
     paypal.payment.create(create_payment_json, async(error, payment) => {
      if (error) {
        return res.status(500).json({ error });
      }
      else {
      req.session.tempBooking = {...bookingDetails,user:req.user.id,paymentId:payment.id}
         return res.json(payment);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Payment creation failed");
  }
});

route.get("/success",async(req,res)=>{
  let {PayerID,paymentId} = req.query
  try {
    console.log("Req.Query",req.query);
    const tempBooking = req.session.tempBooking;
    console.log("tempBooking: ",tempBooking);
    if (!tempBooking) {
      return res.status(400).send("Invalid or expired payment session.");
    }
    const execute_payment_json = {
      "payer_id": PayerID,
      "transactions": [{
          "amount": {
              "currency": "USD",
              "total": tempBooking.price.toFixed(2).toString()
          }
      }]
  }
  paypal.payment.execute(paymentId,execute_payment_json,async(error,payment)=>{
    if (error) {
      console.log(error.response);
      return res.status(500).json({ error: error.response });
    }
    else{
     const booking = await Booking.create(tempBooking)
      if(payment.transactions[0].amount.total == booking.price.toFixed(2)){
         
        return res.redirect(`http://localhost:5173/account/bookings`)
      }
      else {
        return res.status(400).send("Payment amount mismatch");
      }
    }
  })
  } catch (error) {
    console.log(error);
    res.status(500).send("Error verifying payment");
  }
})
export default route;