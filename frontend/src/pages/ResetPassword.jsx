import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoEyeOffSharp } from "react-icons/io5";
import SummaryApi from "../config/Summary.api";
import { IoEye } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const validData = Object.values(data).every((el) => el);

  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Passwords do not match");
    }
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });

      if (response.data.error) {
        toast.error(response.data.message);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <div className="bg-primaryDark my-4 w-full max-w-lg mx-auto rounded p-7">
        <p className="font-semibold text-lg">Enter your password</p>
        <form action="" className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="newPassword">New password :</label>
            <div className="bg-white p-2 border-2 rounded-md flex items-center focus-within:border-secondaryDark hover:shadow-md">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                className="w-full outline-none"
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                placeholder="Enter your new password"
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
            <div className="bg-white p-2 border-2 rounded-md flex items-center focus-within:border-secondaryDark hover:shadow-md">
              <input
                type="password"
                id="confirmPassword"
                className="w-full outline-none"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
              />
            </div>
          </div>

          <button
            className={`${
              validData ? "bg-secondaryDark" : "bg-secondaryLight"
            } py-2 rounded font-semibold my-3 tracking-wide hover:bg-secondaryDark`}
          >
            Reset password
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

export default ResetPassword;
