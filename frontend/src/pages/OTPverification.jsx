import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../config/Summary.api";
import AxiosToastError from "../utils/AxiosToastError";
import { Link, useLocation, useNavigate } from "react-router-dom";

const OTPverification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const location = useLocation();

  useEffect(() => {
    if(!location?.state?.email){
      navigate("/forgot-password");
    }
  },[])

  const validData = data.every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.OTP_Verify,
        data: {
          otp : data.join(""),
          email: location?.state?.email,
        },
      });

      if (response.data.error) {
        toast.error(response.data.error);
      }

      if (response.data.success) {
        toast.success(response.data.message);
        setData(["", "", "", "", "", ""]);
        navigate("/reset-password",{
          state: {
            data : response.data,
            email: location?.state?.email
          }
        });
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div className="w-full container mx-auto px-2">
      <div className="bg-primaryDark my-4 w-full max-w-lg mx-auto rounded p-6">
        <form action="" className="grid gap-4 py-3" onSubmit={handleSubmit}>
          <div className="grid gap-1">
            <label htmlFor="otp">Enter your OTP :</label>
            <div className="flex items-center gap-2 justify-between mt-3">
              {data.map((el, index) => {
                return (
                  <input
                    key={"otp" + index}
                    type="text"
                    id="otp"
                    ref={(ref) => {
                      inputRef.current[index] = ref;
                      return ref;
                    }}
                    value={data[index]}
                    maxLength={1}
                    onChange={(e) => {
                      const value = e.target.value;

                      const newData = [...data];
                      newData[index] = value;
                      setData(newData);

                      if (value && index < 5) {
                        inputRef.current[index + 1].focus();
                      }
                    }}
                    className="bg-white p-2 border-2 w-full max-w-18 rounded-md focus-within:border-secondaryDark outline-none hover:shadow-md text-center font-semibold"
                  />
                );
              })}
            </div>
          </div>

          <button
            disabled={!validData}
            className={`${
              validData ? "bg-secondaryDark" : "bg-secondaryLight"
            } py-2 rounded font-semibold my-3 tracking-wide hover:bg-secondaryDark`}
          >
            Verify OTP
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
    </div>
  );
};

export default OTPverification;
