import React, { useState } from "react";
import { IoEyeOffSharp } from "react-icons/io5";
import { IoEye } from "react-icons/io5";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../config/Summary.api";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validData = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password do not match");
      return;
    }

    try {
      const response = await Axios({
        ...SummaryApi.register,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.error);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-full container mx-auto px-2">
      <div className="bg-primaryDark my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold">Welcome to BookHive!</p>

        <form action="" className="grid gap-4 mt-6" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="name">Username :</label>
            <input
              type="text"
              required
              id="name"
              autoFocus
              className="bg-white p-2 rounded-md focus-within:border-secondaryDark border-2 outline-none hover:shadow-md"
              name="name"
              value={data.name}
              onChange={handleChange}
              placeholder="Enter your username"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              required
              id="email"
              className="bg-white p-2 border-2 rounded-md focus-within:border-secondaryDark outline-none hover:shadow-md"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <div className="grid gap-1">
            <label htmlFor="password">Password :</label>
            <div className="bg-white p-2 border-2 rounded-md flex items-center focus-within:border-secondaryDark hover:shadow-md">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                className="w-full outline-none"
                name="password"
                value={data.password}
                onChange={handleChange}
                placeholder="Enter your password"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="cursor-pointer"
              >
                {showPassword ? <IoEye /> : <IoEyeOffSharp />}
              </div>
            </div>
          </div>

          <div className="grid gap-1">
            <label htmlFor="confirmPassword">Confirm password :</label>
            <input
              type="password"
              required
              id="confirmPassword"
              className="bg-white p-2 border-2 rounded-md focus-within:border-secondaryDark outline-none hover:shadow-md"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
          </div>

          <button
            disabled={!validData}
            className={`${
              validData ? "bg-secondaryDark" : "bg-secondaryLight"
            } py-2 rounded font-semibold my-3 tracking-wide hover:bg-secondaryDark`}
          >
            Sign Up
          </button>
        </form>

        <p>
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-purple-800 underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
