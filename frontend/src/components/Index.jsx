import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoading } from "../context/Loading.jsx";
import { useMessage } from "../context/Message.jsx";
import Message from "./Message.jsx";
import { Link } from "react-router-dom";
function Index() {
  const [places, setPlaces] = useState([]);
  const { setLoading } = useLoading();
  const {message} = useMessage()
  useEffect(() => {
    setLoading(true);
    axios
      .get("/locations/places")
      .then((res) => {
        // console.log(res.data);
        setPlaces(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Message message={message} className={"right-6 absolute top-20"} />
      <div className="mt-24 gap-x-6 gap-y-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {places?.length > 0 &&
          places.map((place) => (
            <Link to={`/places/${place._id}`} key={place._id}>
              <div className=" ml-2 hover:bg-gray-100 hover:delay-100 shadow-lg p-3 rounded-2xl">
                <div className="bg-gray-500 rounded-2xl flex">
                  {place.photos && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={place.photos[0]}
                    />
                  )}
                </div>
                <h3 className="font-bold">{place.address}</h3>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="">
                  <span className="font-bold">${place.price}</span>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}

export default Index;
