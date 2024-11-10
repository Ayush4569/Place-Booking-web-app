import { Router } from "express";
import { User } from "../models/user.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../services/jwt.js";
import path from "path";
import passport from "passport";
import multer from "multer"
const route = Router();
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./uploads/profile"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({storage})
route.post("/register", upload.single("profileImage"), async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body, req.file);
  if (!name || !email || !password) {
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
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      name,
      email,
      password: hashedPassword,
      profileImageUrl: `/profile/${req.file.filename}`,
    });

    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating account:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isValidPassword = await bcrypt.compare(password, user.password);
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
  if (!req.user) return res.json({ message: "Please login first" });
  res.json(req.user);
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
