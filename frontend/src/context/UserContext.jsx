import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (!user) {
      async function fetchUser() {
        try {
          let res = await axios.get("/auth/profile");
          if (res.status === 200 && res.statusText === "OK") {
            setUser(res.data);
            console.log(res.data);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.log("err at userContext", error);
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
