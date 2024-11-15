import { Router } from "express";
const route = Router();
import { Booking } from "../models/bookings.js";
route.post("/bookings", async (req, res) => {
  if(!req.user){
    return res.status(401).json({message:"Login first to book a place"})
  }
  return res.status(401).json({message:"Places can be booked only after payment"})
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
      return res.json({message:"Error finding bookings"});
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