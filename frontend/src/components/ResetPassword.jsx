import React, { useState } from 'react'
import { useMessage } from '../context/Message';
import axios from "axios"
import { useNavigate } from 'react-router-dom';
function ResetPassword() {
    const [oldPassword,setOldPassword] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const {setMessage} = useMessage()
    const navigate = useNavigate()
    async function changePassword(){
      try {
        const response = await axios.post('/auth/resetpassword',{oldPassword,newPassword})
        if(response.statusText == 'OK' && response.status == 200){
          setMessage(response.data.message)
          navigate("/")
        }
      } catch (error) {
         console.log(error);
         setMessage(error.response.data.message)
      }
     
    }
  
  return (
    <div className="grow flex items-center justify-center mt-5">
    {/* <Message className="right-10 w-auto absolute top-28" message={} />  */}
    <div className="mb-32 w-full">
      <h1 className="text-4xl text-center mb-4">Change password</h1>
      <form
        onSubmit={changePassword}
        className="mx-auto max-w-md"
      >
        <input
          type="text"
          placeholder="Enter your old password "
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="email"
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
  )
}

export default ResetPassword