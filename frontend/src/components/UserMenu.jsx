import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Divider from "./Divider";

const UserMenu = () => {
  const user = useSelector((state) => state?.user);
  return (
    <div>
      <div className="font-semibold">My Account</div>
      <div className="text-sm">{user.name || user.email}</div>

      <Divider />

      <div className="text-sm grid gap-2">
        <Link to={""} className="px-2">
          My Reviews
        </Link>
        <button className="text-left px-2">Log out</button>
      </div>
    </div>
  );
};

export default UserMenu;
