import mongoose from "mongoose";

export const connnectDB = async(url)=>{
  await mongoose.connect(url)
}