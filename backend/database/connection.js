import mongoose from "mongoose";

export const connectDB = async(url)=>{
  try {
    const connectionInstance = await mongoose.connect(`${url}`)
    console.log("MONGODB conneced !! DB HOST: ",connectionInstance.connection.host);
  } catch (error) {
    console.log("Error connecting datase :",error);
    process.exit(1)
  }
}
