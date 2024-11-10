import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
const jwtSecret = String(process.env.JWT_SECRET);
function generateToken(user) {
  return jwt.sign(
    {
      name: user.name,
      email: user.email,
      id: user._id,
      photo:user.profileImageUrl
    },
    jwtSecret
  );
}

function getUser(token) {
  return jwt.verify(token, jwtSecret);
}

export { generateToken, getUser };
