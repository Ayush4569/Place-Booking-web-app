import axios from "axios";
import React, { useState, useEffect } from "react";
import Message from "./Message"
import { useParams } from "react-router-dom";
import {useMessage} from "../context/Message"
import BookingWidget from "./BookingWidget";
import PlacesImages from "./PlacesImages";
import PlaceAddress from "./PlaceAddress";
function PlacesPage() {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const {message} = useMessage();
  useEffect(() => {
    if (!id) return;
    axios
      .get(`/locations/places/${id}`)
      .then((response) => {
        setPlace(response.data);
      })
  }, [id]);

  return (
    <div className="mt-8 bg-gray-100 -mx-8 px-8 pt-8">
      <Message className={"right-11 fixed z-10 top-24"} message={message} />
      <h1 className="text-3xl mb-1">{place?.title}</h1>
      <PlaceAddress>{place?.address}</PlaceAddress>
      <PlacesImages place={place} />
      <div className="grid mt-8 mb-8 gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-2xl">Description</h2>
            <p className="text-justify sm:text-sm md:text-xl">
              {" "}
              {place?.description}
            </p>
          </div>
          <h3 className="sm:text-sm md:text-xl"> Check-in: {place?.checkIn}</h3>
          <h3 className="sm:text-sm md:text-xl">
            {" "}
            Check-out: {place?.checkOut}
          </h3>
          <h3 className="sm:text-sm md:text-xl">
            {" "}
            Max number of guests: {place?.maxGuests}
          </h3>
        </div>
        <div>
          <BookingWidget place={place} />
        </div>
      </div>
      <div className="bg-white -mx-8 p-8 border-t">
        <div>
          <h2 className="font-semibold text-2xl">Extra info</h2>
        </div>
        <div className="mt-2 mb-4 sm:text-sm md:text-xl text-gray-700 leading-5 text-balance">
          {place?.extraInfo}
        </div>
      </div>
    </div>
  );
}

export default PlacesPage;
