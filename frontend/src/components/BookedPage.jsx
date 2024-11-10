import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PlaceAddress from "./PlaceAddress";
import PlacesImages from "./PlacesImages";
import BookingDates from "./BookingDates";

function BookedPage() {
  const { id } = useParams();
  const [bookedPlace, setBookedPlace] = useState(null);
  useEffect(() => {
    if (id) {
      axios
        .get(`/trips/my-bookings/${id}`)
        .then((response) => {
          console.log(response.data);
          setBookedPlace(response.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  return (
    <>
    {
      bookedPlace && (
        <div className="my-8">
        <h1 className="text-3xl mb-1">{bookedPlace.place.title}</h1>
        <PlaceAddress className="my-2 block">
          {bookedPlace.place.address}
        </PlaceAddress>
        <div className="bg-gray-300 p-6 my-6 rounded-2xl flex justify-between items-center">
          <div>
          <h2 className="text-2xl mb-4">Your booking information:</h2>
          <BookingDates booking={bookedPlace} />
          </div>
          <div className="bg-primary px-9 py-2 rounded-2xl text-white">
            <div>Total Price</div>
            <div className="text-3xl">${bookedPlace.price}</div>
          </div>
  
        </div>
        <PlacesImages place={bookedPlace.place} />
      </div>
      )
    }
   </>
  );
}

export default BookedPage;
