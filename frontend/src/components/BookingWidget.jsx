import React, { useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import axios from "axios";
import Loading from "./Loading";
function BookingWidget({ place }) {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [loading,setLoading] = useState("")
  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    );
  }
  async function bookPlace() {
    setLoading(true)
    const res = await axios.post("/trips/bookings", {
      place: place?._id,
      checkIn,
      checkOut,
      guests,
      name,
      mobile,
      price: numberOfNights * place?.price,
    });
     console.log(res);
    const bookingId = res.data._id;
    if (res.statusText === "OK") {
      try {
        let paymentRes = await axios.post("/payment", {
          totalPrice: numberOfNights * place?.price,
          bookingId,
        });
        console.log(paymentRes);
        if (paymentRes.statusText === "OK") {
          window.location.href = paymentRes.data.links[1].href;
        }
      } catch (error) {
        console.log("Err at payment ");
      }
    }
      setLoading(false)
  }

  if(loading){
    return <Loading/>
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
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="px-3 py-4 border-l">
            <label>Check out: </label>
            <input
              type="date"
              value={checkOut}
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

      <button onClick={bookPlace} className="primary mt-1">
        Book this place
        {numberOfNights > 0 && <span> ${numberOfNights * place?.price}</span>}
      </button>
    </div>
  );
}

export default BookingWidget;
