import { Router } from "express";
const route = Router();
import { places } from "../models/place.js";

route.get("/places", async (req, res) => {
  return res.json(await places.find({}));
});
route.post("/places", async (req, res) => {
  // console.log(req.body, req.files);
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
    return res.json({ message: "Log in to add your place" });
  } else {
    const placeDoc = await places.create({
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
    });
    console.log(placeDoc);
    return res.json(placeDoc);
  }
});
route.get("/user-places", async (req, res) => {
  if (!req.user) {
    return res.json({ message: "Log in to view your places" });
  } else {
    let { id } = req.user;
    return res.json(await places.find({ owner: id }));
  }
});
route.get("/places/:id", async (req, res) => {
  res.json(await places.findById(req.params.id));
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
