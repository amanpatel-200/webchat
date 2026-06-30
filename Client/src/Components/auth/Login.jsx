import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useContext } from "react";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import toast from "react-hot-toast";
const Login = () => {
  const navigate = useNavigate()
  const {serverUrl } = useContext(authDataContext)
  const{setUserdata,getCurrentUser} = useContext(userDataContext)
  const [loading,setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) =>{
    const userInfo = {
      email:data.email,
      password:data.password, 
    }
    try {
      setLoading(true);
      let res = await axios.post(`${serverUrl}/api/user/login`,userInfo , {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },);
        toast.success(res.data.message)
        setUserdata(res.data.user);
        localStorage.setItem("messenger",JSON.stringify(res.data.user));
        await getCurrentUser();
        navigate("/")
        setLoading(false);
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
 
  

  return (
   <div className="w-screen min-h-screen flex items-center justify-center bg-slate-950">
   
         <div className="flex w-full md:w-1/2 items-center justify-center">
           <form className="w-[90%] max-w-md bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-8 flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmit)}
        >
           
             
             <h1 className="text-3xl font-bold text-center text-white">
               Login Your Account
             </h1>
             <h1 className="text-3xl font-bold text-center text-white">
               Welcome to <span className='text-blue-500'>Safe</span><span className='text-green-500'>Talk</span>
             </h1>
   
            
   
             <div className="flex flex-col gap-1">
               <label htmlFor="email" className="text-gray-300 font-medium">
                 Email
               </label>
               <input
                 type="email"
                 id="email"
                 name="email"
                 placeholder="Enter Email"
                 required
                  {...register("email", { required: true })}
                 className="h-11 bg-slate-800 border border-slate-700 rounded-lg px-4 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
               />
               {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
             </div>
   
             <div className="flex flex-col gap-1">
               <label htmlFor="password" className="text-gray-300 font-medium">
                 Password
               </label>
               <input
                 type="password"
                 id="password"
                 name="password"
                 placeholder="Enter Password"
                 required
                 {...register("password", { required: true })}
                 className="h-11 bg-slate-800 border border-slate-700 rounded-lg px-4 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
               />
               {errors.password && (
                <span className="text-red-500">This field is required</span>
               )}
             </div>
             {loading?(<span className="loading loading-spinner loading-xl text-center bg-green-600"></span>):(<button className="h-11 rounded-lg bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold disabled={loading}">
               Login
             </button>)
   }
             <span className="text-sm text-center text-gray-400">
               Don't have an account?
               <Link to="/signup" className="text-green-500 font-medium hover:underline">
                 Sign up
               </Link>
             </span>
   
           </form>
         </div>
   
       </div>
  );
};

export default Login;
