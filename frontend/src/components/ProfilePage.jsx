import { useUser } from "../context/UserContext";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav";
import { useMessage } from "../context/Message";
import Message from "./Message";
import Loading from "./Loading";
function ProfilePage() {
  const { user, loading, setUser } = useUser();
  const {message,setMessage} = useMessage()
  const navigate = useNavigate()
  async function logout() {
    try {
      const res = await axios.post("/auth/logout");
      if (res.statusText === "OK") {
        setMessage(res.data.message);
        setUser(null);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  if (loading) {
    return <Loading/>;
  }
 
  return (
    <div>
      <AccountNav/>
      <div className="flex flex-col items-center">
      <Message message={message}/>  
         <div className="text-xl  mt-4">
          <h3> Reset password ? </h3>
           <span className="text-blue-800 underline cursor-pointer" onClick={()=>navigate("/resetPassword")}>Click here to reset</span>
         </div>
         
         <div className="text-xl text-center mt-6  ">
          <h3>Change account details ? </h3>
           <span className="text-blue-800 underline cursor-pointer" onClick={()=>navigate("/changeAccountDetails")}>Click here to change account details</span>
         </div>
        <div className="mx-auto mt-8 max-w-lg text-center">
          <h2>
            Logged in as {user?.name.toUpperCase()} ({user?.email}){" "}
          </h2>
          <button onClick={logout} className="primary max-w-xs mt-3">
            Logout
          </button>
        </div>
      </div>
    
    </div>
  );
}

export default ProfilePage;
