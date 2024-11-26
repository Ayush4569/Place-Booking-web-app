import { Router } from "express";
import { User } from "../models/user.js";
import { generateToken } from "../services/jwt.js";
import passport from "passport";
import { multerPhotoUploader } from "../middlewares/multer.js";
import { uploadOnCloudinary } from "../services/cloudinary.js";
const route = Router();

route.post(
  "/register",
  multerPhotoUploader.single("profileImage"),
  async (req, res) => {
    const { name, email, password,mobileNumber,country } = req.body;
    // console.log(req.body);
    if ([name, email, password].some((field) => field.trim() == "")) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "User already exists" });
      // upload the profile pic (if there) on cloudinary
      let profileAvatar;
      // console.log("reqFile: ",req.file);
      if (req.file && req.file.path) {
        profileAvatar = req.file.path;
        // console.log("profileAvatar : ",profileAvatar);
      }
      const avatarImage = await uploadOnCloudinary(profileAvatar);
      // Create a new user
      await User.create({
        name,
        email,
        password,
        profileImageUrl: avatarImage.url,
        mobileNumber,
        country
      });

      // Send a success response
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating account:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isValidPassword = await user.isPasswordCorrect(password)
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const token = generateToken(user);
    res.cookie("authToken", token, { httpOnly: true });
    return res.status(200).json({
      message: "Login successfull!!",
      user: {
        name: user.name,
        email: user.email,
        id: user._id,
        photo: user.profileImageUrl,
      },
    });
  } catch (error) {
    console.error("Error logging in :", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
route.post("/logout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Error logging out" });
      }
      // Clear the cookies
      res.clearCookie("authToken");
      res.status(200).json({ message: "Logout successful" });
    });
  } catch (error) {
    return res.json({ message: "Error logging out" });
  }
});
route.get("/profile", (req, res) => {
  if (!req.user) return res.status(400).json({ message: "Please login first" });
  else {
    return res.status(200).json(req.user);
  }
});
route.post("/resetpassword", async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  console.log(req.body);
  try {
    if ([oldPassword, newPassword].some((field) => field.trim() != "" && field != null)) {
       const user = await User.findById(req?.user?.id)
       const isPasswordCorrect = await user.isPasswordCorrect(oldPassword)
      if(!isPasswordCorrect){
        return res.status(400).json({message:"Incorrect Password"})
      }
      user.password = newPassword;
      await user.save();
      return res.status(200).json({message:"Password changed sucessfully"})
    }
    else{

    }
  } catch (error) {
    return res.status(500).json({message:error.message})
  }
});
route.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
route.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect home.
    const token = req.user;
    // Send JWT as an HTTP-only cookie
    // console.log("req.data ",req.user);
    res.cookie("authToken", token, { httpOnly: true });
    res.redirect("http://localhost:5173/");
  }
);
export default route;
