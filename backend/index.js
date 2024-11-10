import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import cookieParser from "cookie-parser";
import session from "express-session";
import { passport } from "./services/passport.js";
dotenv.config();
// importing all files from Imports.js
import {
  connnectDB,
  authRoute,
  photoUploadRoute,
  placesRoute,
  bookingsRoute,
  checkAuthCookie,
  paymentRoute
} from "./Imports.js";

// creating express app
const app = express();

// console.log(process.env.JWT_SECRET,process.env.CLIENT_ID,process.env.CLIENT_SECRET,process.env.MONGO_URL);
// using middlewares
app.use("/uploads", express.static(path.resolve("./uploads")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    // allowedHeaders: ["Authorization", "Content-type"],
    origin: "http://localhost:5173",
  })
);
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(checkAuthCookie);
app.use(passport.initialize());
app.use(passport.session());

// connecting database
connnectDB(String(process.env.MONGO_URL))
  .then(() => {
    app.listen(4000, () => {
      console.log("MongoDB connected");
      console.log("Server running at port 4000");
    });
  })
  .catch(() => console.log("Error connecting Database"));

// creating apis
app.get("/", (req, res) => {
  res.json("Hello");
});
// using routes
app.use("/auth", authRoute);
app.use("/photo", photoUploadRoute);
app.use("/locations", placesRoute);
app.use("/trips", bookingsRoute);
app.use("/payment", paymentRoute);
