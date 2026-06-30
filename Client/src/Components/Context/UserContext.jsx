import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { authDataContext } from './AuthContext';
// eslint-disable-next-line react-refresh/only-export-components
export const userDataContext = createContext();
const UserContext = ({children}) => {
  const{serverUrl} = useContext(authDataContext);
    const [userData,setUserdata] = useState(null);
    const[loading,setLoading] = useState(true);
    const getCurrentUser = async () => {
     
    try {
      let result = await axios.get(`${serverUrl}/api/user/currentuser`, {
        withCredentials: true,
      });
      setUserdata(result.data.user);
    } catch (error) {
      setUserdata(null);
      console.log(error);
    } finally{
      setLoading(false);
    }
  };
  useEffect(() => {
    
    getCurrentUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    const value = {
        userData,setUserdata,getCurrentUser,loading,setLoading
    }
   
  return (
    <userDataContext.Provider value = {value}>
      {children}
    </userDataContext.Provider>
  )
}

export default UserContext