import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Divider from "./Divider";
import Axios from "../utils/Axios";
import SummaryApi from "../config/Summary.api";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FaExternalLinkAlt } from "react-icons/fa";

const UserMenu = ({ setShowUserMenu }) => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
        navigate("/");
        if (setShowUserMenu) {
          setShowUserMenu(false);
        }
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm flex items-center gap-2">
        <span className="mex-w-52 text-ellipsis line-clamp-1">
          {user.name || user.email}
        </span>
        <Link to={"/dashboard/profile"} className="hover:text-blue-400">
          <FaExternalLinkAlt size={15} />
        </Link>
      </div>

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
