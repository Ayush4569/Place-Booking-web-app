import { createContext,useContext,useState } from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext();

export const LoadingContextProvider = ({children})=>{
    
    const [loading,setLoading] = useState(false)
    return (
        <LoadingContext.Provider value={{loading,setLoading}}>
            {loading && <Loading/>}
            {children}
        </LoadingContext.Provider>
    )
}

export const useLoading =()=> useContext(LoadingContext)