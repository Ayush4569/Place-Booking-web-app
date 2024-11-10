import { Router } from "express";
const route = Router();
import { Booking } from "../models/bookings.js";
route.post("/bookings", async (req, res) => {
  if(!req.user){
    return res.json({message:"Login first to book a place"})
  }
  let { place, checkIn, checkOut, guests, name, mobile, price } = req.body;
  try {
    if(req.body != null){
        const doc = await Booking.create({
            place,
            checkIn,
            checkOut,
            price,
            guests,
            name,
            contact: mobile,
            user: req.user.id,
          })
          return res.json(doc)
    }
   else{
    return res.json({message:"Enter all the details to book this place "})
   }
  } catch (error) {
    console.log("error in booking", error);
    return res.json({message:"something went wrong pls try again"})
  }
});
route.get("/my-bookings", async (req, res) => {
    try {
        if(!req.user){
            return res.json({message:"Login first to see your bookings"})
          }
          else{
            return res.json(
                await Booking.find({ user: req.user.id }).populate("place")
              );
          }
    } catch (error) {
        
    }
});
route.get("/my-bookings/:id", async (req, res) => {
    try {
        let bookedPlace = await Booking.find({ _id: req.params.id }).populate(
            "place"
          );
          return res.json(bookedPlace);
    } catch (error) {
        return res.json({message:"Error finding this page"});
    }
});

export default route