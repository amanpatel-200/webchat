import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios"
import { useContext } from "react";
import { authDataContext } from "../Context/AuthContext";
import { userDataContext } from "../Context/UserContext";
import toast from "react-hot-toast";

const Signup = () => {
  const {serverUrl } = useContext(authDataContext)
  const {setUserdata} = useContext(userDataContext);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async(data) =>{
    const userInfo = {
      name:data.name,
      email:data.email,
      password:data.password,
      
    }
    try {
      let res = await axios.post(`${serverUrl}/api/user/signup`,userInfo , {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        },);
        toast.success(res.data.message)
        setUserdata(res.data.user);
        
       localStorage.setItem("messenger", JSON.stringify(res.data.user));
       navigate("/")
    } catch (error) {
     toast.error(error.response?.data);
      console.log(error)
    }
  }
  const password = watch("password");
  const validatePasswordMatch = (value) => {
    return value === password || "Password and Confirm Password don't match";
  };

  return (
    <div className="w-screen min-h-screen flex items-center justify-center bg-slate-950">
      <div className="flex w-full md:w-1/2 items-center justify-center">
        <form
          className="w-[90%] max-w-md bg-slate-900 border border-slate-700 shadow-2xl rounded-2xl p-8 flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-3xl font-bold text-center text-white">
            Create Account
          </h1>
          <h1 className="text-3xl font-bold text-center text-white">
            Welcome to <span className="text-blue-500">Safe</span>
            <span className="text-green-500">Talk</span>
          </h1>

          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-gray-300 font-medium">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Name"
              required
              {...register("name", { required: true })}
              className="h-11 bg-slate-800 border border-slate-700 rounded-lg px-4 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
            {errors.name && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>

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
              {...register("password", { required: true })}
              required
              className="h-11 bg-slate-800 border border-slate-700 rounded-lg px-4 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-300 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="password"
              name="confirmPassword"
              placeholder="Enter Password"
              required
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
              className="h-11 bg-slate-800 border border-slate-700 rounded-lg px-4 text-white placeholder-gray-400 outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message || "This field is required"}
              </span>
            )}
          </div>

          <button className="h-11 rounded-lg bg-green-600 hover:bg-green-700 transition cursor-pointer text-white font-semibold">
            Sign Up
          </button>

          <span className="text-sm text-center text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-500 font-medium hover:underline"
            >
              Login
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;
