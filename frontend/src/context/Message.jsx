import { createContext,useContext, useState,useEffect } from "react";

const MessageContext = createContext({
    message:null
})

export const MessageContextProvider = ({children})=>{
    const [message,setMessage] = useState(null)
    useEffect(() => {
        if (message) {
          const timer = setTimeout(() => {
            setMessage("");
          }, 2000);
          return () => clearTimeout(timer);
        }
      }, [message]);
    return (
        <MessageContext.Provider value={{message,setMessage}}>
            {children}
        </MessageContext.Provider>
    )
}
export const useMessage =()=> useContext(MessageContext)