import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
    },
    mobileNumber:{
      type:String,
      required: [true,"Mobile number is required"]
    },
    country:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

// Hash the password just before saving the user document
userSchema.pre("save",async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next()
})
// create a method to check for corrct pass given by user
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password,this.password);
}
export const User = model("user", userSchema);
