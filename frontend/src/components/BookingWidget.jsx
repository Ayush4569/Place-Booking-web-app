import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  async function bookPlace() {
        try {
          let bookingDetails = {
            place: place?._id,
              checkIn,
              checkOut,
              guests,
              name,
              contact:mobile,
              price: numberOfNights * place?.price,
              
          }
          let paymentRes = await axios.post("/payment", {
            totalPrice: numberOfNights * place?.price,
            bookingDetails
          });
          console.log("PaymentRes : ", paymentRes);
          if (paymentRes.status === 200) {
            window.location.href = paymentRes.data.links[1].href;
          } else {
            console.log("Payment initiation failed. Please try again or contact support.");
          }
        } catch (error) {
          console.error("Error during payment:", error);
        } finally {
    }
  }

  return (
    <div className="bg-white shadow white p-4 rounded-2xl">
      <div className="text-2xl text-center">
        Price: ${place?.price} / per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="px-3 py-4">
            <label>Check in: </label>
            <input
              type="date"
              value={checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="px-3 py-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
              min={ new Date().toISOString().split("T")[0]}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>
        <div className="px-3 py-4 border-t">
          <label>Number of guests </label>
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>
        {numberOfNights > 0 && (
          <div className="px-3 py-4 border-l">
            <label> Your full name : </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label> Phone Number : </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        )}
      </div>

      <button onClick={bookPlace}  className="primary my-3">
        {numberOfNights > 0 ? (
          <span>Total: ${numberOfNights * place?.price}</span>
        ) : (
          <span> Total: ${place?.price}</span>
        )}
      </button>
    </div>
  );
}

export default BookingWidget;
