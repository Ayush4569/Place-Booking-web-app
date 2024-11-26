import React, { useState } from "react";
import { useMessage } from "../context/Message";
import Message from "./Message"
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ResetPassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { message,setMessage } = useMessage();
  const navigate = useNavigate();
  async function changePassword(e) {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/resetpassword", {
        oldPassword,
        newPassword,
      });
      console.log(response);
      if (response.statusText == "OK" && response.status == 200) {
        setMessage(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.message);
    }
  }

  return (
    <div className="grow flex items-center justify-center mt-5">
      <Message className="right-10 w-auto absolute top-28" message={message} /> 
      <div className="mb-32 w-full">
        <h1 className="text-4xl text-center mb-4">Change password</h1>
        <form onSubmit={(e) => changePassword(e)} className="mx-auto max-w-md">
          <input
            type="password"
            placeholder="Enter your old password "
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button type="submit" className="primary">
            Reset password
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
