import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import { useLoading } from "../context/Loading";

import { useMessage } from "../context/Message";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { message, setMessage } = useMessage();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();
  async function registerUser(e) {
    e.preventDefault();
    showLoading()
    try {
      // parsing to form data inorder to send the image file to the server
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);
      const response = await axios.post("/auth/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
    finally{
      hideLoading()
    }
  }
  return (
    <div className="grow flex items-center justify-center mt-5">
      <Message message={message} /> {/* Displaying message */}
      <div className="mb-32 w-full">
        <h1 className="text-4xl text-center mb-4">Signup</h1>
        <form
          onSubmit={registerUser}
          className="mx-auto max-w-md"
          encType="multipart/form-data"
        >
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="text-lg">Upload your profile image:</label>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files[0])}
            name="profileImage"
            className="my-2"
          />
          <button type="submit" className="primary">
            Signup
          </button>
          <div className="py-2 text-center text-gray-500">
            Already have an account ?{" "}
            <Link to="/login" className="text-red-800 underline">
              {" "}
              Login{" "}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
