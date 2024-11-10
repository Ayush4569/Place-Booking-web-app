import React, { useState, useEffect } from "react";
import Perks from "./Perks";
import { useNavigate, useParams } from "react-router-dom";
import UploadPics from "./UploadPics";
import axios from "axios";
function PlacesFormPage() {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setmaxGuests] = useState(1);
  const [price,setPrice] = useState(100)
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (!id) return;
    axios.get(`/locations/places/${id}`).then((res) => {
      const { data } = res;
      setTitle(data.title);
      setAddress(data.address);
      setAddedPhotos(data.photos);
      setDescription(data.description);
      setPerks(data.perks);
      setExtraInfo(data.extraInfo);
      setCheckIn(data.checkIn);
      setCheckOut(data.checkOut);
      setmaxGuests(data.maxGuests);
      setPrice(data.price)
    });
  }, [id]);

  function inputHeader(text) {
    return <h2 className="text-2xl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }

  async function savePlace(e) {
    e.preventDefault();
    let placesData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    };
    if (id) {
      // edit a place
      try {
        const res = await axios.put(`/locations/places/${id}`,placesData);
        if (res.statusText === "OK") {
          navigate("/account/places");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      // add a new place
      try {
        const res = await axios.post("/locations/places", placesData);
        console.log(res);
        if (res.statusText === "OK") {
          navigate("/account/places");
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      <div>
        <form onSubmit={savePlace}>
          {preInput("Title", "Title for your place")}
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the title"
          />
          {preInput("Address", "Address to this place")}
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter the Address"
          />
          {preInput(
            "Photos",
            " More photos are recommended to enhance the view of the place"
          )}
          <UploadPics
            addedPhotos={addedPhotos}
            setAddedPhotos={setAddedPhotos}
          />
          {preInput("Description", "  Add the description of this place")}

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {preInput("Perks", "  Select all the perks of this place")}

          <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-3">
            <Perks perks={perks} setPerks={setPerks} />
          </div>
          {preInput("Extra info", "Houserules etc")}

          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          {preInput(
            "Check in & out time",
            "Add check in&out time remeber to have some time window for cleaning the room between guests."
          )}

          <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Check in time</h3>
              <input
                type="text"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
                placeholder="14:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check out time</h3>
              <input
                type="text"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                placeholder="18:00"
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guest</h3>
              <input
                type="number"
                value={maxGuests}
                onChange={(e) => setmaxGuests(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max number of guest</h3>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
}

export default PlacesFormPage;
