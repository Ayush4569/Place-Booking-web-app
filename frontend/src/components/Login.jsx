import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Message from "./Message";
import { useMessage } from "../context/Message";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {message,setMessage} = useMessage()
  

  const navigate = useNavigate();
  const { setUser } = useUser();
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "/auth/login",
        { email, password }
      );
      if (response.status === 200) {
        console.log(response.data.user);
        setUser(response.data.user);
        navigate("/");
      }
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.message);
    }
  
  }
  function handleGoogleAuth(){
    window.location.href = 'http://localhost:4000/auth/google'
  }

  return (
    <div className="grow flex  items-center justify-center mt-5">
      <div className="mb-32">
      <Message message={message}/>  {/* Displaying message */}
        <h1 className="text-4xl text-center mb-4">Login</h1>
        <form onSubmit={handleLogin} className="mx-auto max-w-md">
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
          <button type="submit" className="primary my-2 ">Login</button>
          <div className="py-2 text-center text-gray-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="text-red-800 underline">
              {" "}
              Register{" "}
            </Link>
          </div>
        </form>
         
         <p className="text-lg mt-4"> Have an google account?</p>
         <div onClick={handleGoogleAuth} className="text-lg  inline-block text-primary hover:text-blue-500 underline">
         Login with google now
         </div >
      </div>
    </div>
  );
}

export default Login;
