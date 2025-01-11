import React from "react";
import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";

const Profile = () => {
  const user = useSelector((state) => state?.user);
  console.log("user from store", user);
  return (
    <div>
      <div className="w-20 h-20 bg-secondaryLight rounded-full flex items-center justify-center overflow-hidden drop-shadow-sm">
        {
          user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-16 h-16"
            />
          ) : (
            <FaRegUserCircle size={50} />
          )
        }
      </div>
      <button className="text-sm min-w-20 border border-secondaryLight hover:border-secondaryDark px-3 py-1 rounded-full mt-3">Edit</button>
    </div>
  );
};

export default Profile;
