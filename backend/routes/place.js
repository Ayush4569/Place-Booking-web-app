import { Router } from "express";
const route = Router();
import { places } from "../models/place.js";
import { deleteFromCloudinary } from "../services/cloudinary.js";

async function cloudinaryDelete(addedPhotos) {  
  if (addedPhotos && addedPhotos.length > 0) {  
    const photosToDelete = addedPhotos.map((photoUrl) => photoUrl.split("/").pop().split(".")[0]);  
    await deleteFromCloudinary(photosToDelete);  
  }  
}  

function validatePlaceData(placeData) {  
  const errors = [];  
  const { title, address, description, extraInfo, checkIn, checkOut, price, maxGuests, addedPhotos, perks } = placeData;  

  // Basic validation.  Expand this to be much more thorough!  
  if (!title?.trim()) errors.push("Title is required");  
  if (!address?.trim()) errors.push("Address is required");  
  if (!description?.trim()) errors.push("Description is required");  
  if (!extraInfo?.trim()) errors.push("extraInfo is required");  
  if (!checkIn?.trim()) errors.push("checkIn is required");  
  if (!checkOut?.trim()) errors.push("checkOut is required");  
  if (!price) errors.push("price is required");  
  if (!maxGuests) errors.push("maxGuests is required");   
  if (!addedPhotos || addedPhotos.length === 0) errors.push("At least one image is required");  
  if (!perks || perks.length === 0) errors.push("At least one perk is required");  

  return errors;  
}  

route.post("/places", async (req, res) => {
  console.log(req.body);
  try {
    const {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: "Log in to add your place" });
    }

    const errors = validatePlaceData({
      title,
      address,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
      addedPhotos,
    });
    if (errors.length > 0 ) {
      await cloudinaryDelete(addedPhotos); //Clean up on validation failure
      return res.status(400).json({ errors});
    }

    try {
      const placeDoc = await places.create(
        {
          owner: req.user.id,
          title,
          address,
          photos: addedPhotos,
          description,
          perks,
          extraInfo,
          checkIn,
          checkOut,
          maxGuests,
          price,
        },
      );
      return res.status(201).json(placeDoc);
    } catch (dbError) {
      await cloudinaryDelete(addedPhotos);
      console.error("Database error:", dbError); //Log detailed error for debugging
      return res
        .status(500)
        .json({ message: "Failed to create place. Please try again later." });
    }
  } catch (error) {
    console.error("Error creating place:", error);
    return res.status(500).json({ message: "An unexpected error occurred." });
  }
});
route.get("/places", async (req, res) => {
  return res.json(await places.find({}));
});


route.get("/user-places", async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Log in to view your places" });
  } else {
    return res.json(await places.find({ owner: req.user.id }));
  }
});
route.get("/places/:id", async (req, res) => {
  res.json(await places.findById(req.params.id).populate("owner"));
});
route.put("/places/:id", async (req, res) => {
  let {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;

  if (!req.user) {
    return res.json({ message: "Log in to edit your places" });
  } else {
    let placeDoc = await places.findById(req.params.id);
    if (req.user.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title,
        address,
        photos: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      console.log(placeDoc);
      await placeDoc.save();
      return res.json("place edited successfully");
    }
  }
});

export default route;
