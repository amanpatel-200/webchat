import React from "react";
import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import HomePage from "../src/Components/Home/HomePage"
import ProfilePage from "../src/Components/Pages/ProfilePage"
import Login from "../src/Components/auth/Login"
import Signup from "../src/Components/auth/Signup"
import  { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./Components/Pages/ProtectedRoute";
import Mainpage from "./Components/Pages/Mainpage";
const App = () => {
  
  const appRouter = createBrowserRouter([
   {
    path : "/",
    element : (
      <ProtectedRoute>
        <HomePage/>
      </ProtectedRoute>
    )
   },
    {
      path:"/profile",
      element:<ProfilePage/>
    },
    {
      path:"/login",
      element:<Login/>
    },
    {
      path:"/signup",
      element:<Signup/>
    },
    {
      path:"/mainpage",
      element:<Mainpage/>
    },

  ])
  return (
   <>
     <RouterProvider router={appRouter}/>
     <Toaster/>
    </>
    );
};

export default App;
