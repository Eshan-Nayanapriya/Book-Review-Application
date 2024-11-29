import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../config/Summary.api";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const UserMenu = ({ setShowUserMenu }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        setShowUserMenu(false);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user.name || user.email}</div>

      <Divider />

      <div className="text-sm grid gap-1">
        <Link to={""} className="px-2 hover:bg-primaryLight py-1">
          My Reviews
        </Link>
        <button
          className="text-left px-2 hover:bg-primaryLight py-1"
          onClick={handleLogOut}
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default UserMenu;
