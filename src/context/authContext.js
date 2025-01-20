import { createContext, useContext} from "react";
import React,{useState, useEffect} from "react";
import { supabase } from "../lib/supabase";

const AuthContext = createContext();
 
export const AuthProvider = ({children})=>{

 const [session, setSession] = useState(null);
  const [user, setUser] = useState(null); // Store user details

  const setAuth = authUser=>{
    setUser(authUser);
}

const setUserData = userData =>{
    setUser({...userData});
}
    return(
        <AuthContext.Provider value={{session,user,setSession, setAuth, setUserData}}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);