import React, { useState, useCallback,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Message from "./Message";
import { useLoading } from "../context/Loading";
import {countries} from "../utils/CountryCodes.js"
import { useMessage } from "../context/Message";
function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState(null);
  const [profileImage, setProfileImage] = useState("");
  const [country,setCountry] = useState("India")
  const [countryCode,setCountryCode] = useState("+91")
  const { message, setMessage } = useMessage();
  const { setLoading } = useLoading();
 const navigate = useNavigate()
   
   useEffect(() => {
    const matchingCountry = countries.find((country)=> country.phone == countryCode)
    console.log("Matching : ",matchingCountry);
    setCountry(matchingCountry ?  matchingCountry.name : "India")
   }, [countryCode])
   
 
  async function registerUser(e) {
    e.preventDefault();
    setLoading(true)
    try {
      // parsing to form data inorder to send the image file to the server
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("profileImage", profileImage);
      formData.append("mobileNumber",contactNumber)
      formData.append("country",country)
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
      setMessage(error.response.data.message);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div className="grow flex items-center justify-center mt-5">
      <Message className="right-10 w-auto absolute top-28" message={message} /> 
      <div className="mb-32 w-full">
        <h1 className="text-4xl text-center mb-4">Signup</h1>
        <form
          onSubmit={registerUser}
          className="mx-auto max-w-md p-5"
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
            placeholder="Set your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-2 w-full">
            <select name="countryCodes" className="border border-gray-500 h-max w-max p-2 rounded-md" value={countryCode} onChange={(e)=>{setCountryCode(e.target.value)}}>
            {
              countries.map((country)=> (
                <option key={country.name}>+{country.phone}</option>
              ))
            }
            </select>
          <input
            type="number"
            placeholder="Enter your contact number"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
          />
          </div>
          
          <div className="flex items-center gap-2 text-nowrap my-3 w-full">
          <label className="text-md">Select your region:</label>
          <select name="country" className="border border-gray-500 h-max w-2/3 p-2 rounded-md" value={country} onChange={e=>setCountry(e.target.value)}>
            {
              countries.map((country)=> (
                <option key={country.name}>{country.name}</option>
              ))
            }
            </select>
          </div>
       

          <label className="text-lg">Upload a profile Image</label>
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
