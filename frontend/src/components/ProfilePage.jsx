import { useUser } from "../context/UserContext";
import {useNavigate } from "react-router-dom";
import axios from "axios";
import AccountNav from "./AccountNav";
import { useMessage } from "../context/Message";
import Message from "./Message";
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
    return "Loading...";
  }
 
  return (
    <div>
      <AccountNav/>
      <div className="flex flex-col items-center">
      <Message message={message}/>  
        <div className="mx-auto mt-8 max-w-lg text-center">
          <h2>
            Logged in as {user?.name} ({user?.email}){" "}
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
