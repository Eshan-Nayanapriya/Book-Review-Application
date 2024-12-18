import React, { useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../config/Summary.api";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });

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
    try {
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/otp-verify",{
          state: { email: data.email },
        });
        setData({
          email: "",
        });
        
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-primaryDark my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Forgot Password</p>
        <form action="" className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              className="bg-white p-2 border-2 rounded-md focus-within:border-secondaryDark outline-none hover:shadow-md"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
          </div>

          <button
            disabled={!validData}
            className={`${
              validData ? "bg-secondaryDark" : "bg-secondaryLight"
            } py-2 rounded font-semibold my-3 tracking-wide hover:bg-secondaryDark`}
          >
            Send OTP
          </button>
        </form>

        <p>
        Already have an account?{" "}
          <Link
            to={"/login"}
            className="font-semibold text-purple-800 underline"
          >
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default ForgotPassword;
