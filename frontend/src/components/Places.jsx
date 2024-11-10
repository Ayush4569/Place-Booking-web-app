import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import { useState, useEffect } from "react";
import axios from "axios";
function Places() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios
      .get("/locations/user-places")
      .then((placesData) => {
        setPlaces(placesData.data);
        console.log(placesData);
      })
      .catch((err) => {
        console.log("Error fetching places", err);
      });
  }, []);

  return (
    <div>
      <AccountNav />

      <div className="text-center">
        <Link
          to="/account/places/new"
          className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-2xl"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          <p>Add new place</p>
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 && places.map((place)=>(
          <Link to={`/account/places/${place._id}`} key={place._id} className="flex gap-4 p-4 bg-gray-100 cursor-pointer rounded-2xl my-3 ">
            <div className="flex w-32 h-32 bg-gray-300 grow shrink-0">
             <img className="object-cover" src={`http://localhost:4000/uploads/${place.photos[1]}`} alt={place.title} />
            </div>
           <div className="grow-0 shrink">
           <h2 className="text-xl">{place.title}</h2>
           <p className="text-sm mt-2">{place.description}</p>
           
           </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Places;
