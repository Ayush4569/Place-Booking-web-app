import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { User } from "../models/user.js";
import dotenv from "dotenv";
import { generateToken, getUser } from "./jwt.js";
dotenv.config();
passport.use(
  new Strategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "abc",
            profileImageUrl: profile.photos[0].value,
          });
        }
        if (user != undefined && user != null) {
          const googleToken = generateToken(user);
          // console.log("googleToken",googleToken);o
          return done(null, googleToken);
        } else {
          return done("Error occured", null);
        }
      } catch (error) {
        return done(error, null);
      }
    }
  )
);
passport.serializeUser((googleToken, done) => {
  // console.log("User to serialize:", data.user);
  done(null, googleToken);
});

// Deserialize user out of session
passport.deserializeUser((token, done) => {
  try {
    const user = getUser(token); // Get the user from the token
    done(null, user); // This will only return id, name, and profileImage from the token
  } catch (err) {
    done(err, null);
  }
});

export { passport };
