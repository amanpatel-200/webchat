import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userDataContext } from "../Context/UserContext";

const ProtectedRoute = ({ children }) => {
  const { userData, loading } = useContext(userDataContext);

  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
       <span className="loading loading-spinner loading-xl text-center bg-green-600"></span>
      </div>
    );
  }


  if (!userData) {
    return <Navigate to="/mainpage" replace />;
  }

  // ✅ Logged in
  return children;
};

export default ProtectedRoute;