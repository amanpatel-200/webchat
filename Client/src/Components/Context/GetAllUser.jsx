import React, { useContext, useEffect, useState } from 'react'
import axios from "axios";
import { authDataContext } from './AuthContext';
const GetAllUser = () => {
    const[allUser,SetallUser] = useState([]);
   
    const[loading,SetLoading] = useState(false);
     const {serverUrl} = useContext(authDataContext)
    useEffect(()=>{
     const getUsers= async()=> {
        SetLoading(true);
        try {
         const res = await axios.get(`${serverUrl}/api/user/getuserprofile`,{withCredentials:true});
         SetallUser(res.data)
        
         SetLoading(false);
      } catch (error) {
        console.log(`error in get all user ${error}`);
      }};
      getUsers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return [allUser,loading,SetallUser]
}

export default GetAllUser