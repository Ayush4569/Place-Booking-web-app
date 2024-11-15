import {model,Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profileImageUrl:{
        type:String,
        default:"/profile/default.png"
    }
    
})

export const User = model("user",userSchema);
