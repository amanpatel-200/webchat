import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { authDataContext } from "../Context/AuthContext";
import  axios  from "axios";
import { useNavigate } from "react-router-dom";
import GetAllUser from "../Context/GetAllUser";
import { userDataContext } from "../Context/UserContext";
import toast from "react-hot-toast";


const Logout = () => {
  const {serverUrl} = useContext(authDataContext)
 const {setUserdata} =useContext(userDataContext)
  const navigate = useNavigate();

const handleLogout = async () => {
  try { 
    const res = await axios.post(
      `${serverUrl}/api/user/logout`,
      {},                 // no body
      { withCredentials: true } // config
    );

    setUserdata(null);
    localStorage.removeItem("messenger");
    toast.success(res.data.message);
    navigate("/login");
  } catch (error) {
    toast.error("Error in Logout")
    console.log(error);
  }
};
  return (
    <button className="mb-5 p-3 rounded-xl hover:bg-gray-700 duration-300"
     onClick={handleLogout}
    >
      <FiLogOut className="text-white text-2xl " />
    </button>
  );
};

export default Logout;