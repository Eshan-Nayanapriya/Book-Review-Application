import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { VscTriangleDown } from "react-icons/vsc";
import { VscTriangleUp } from "react-icons/vsc";
import UserMenu from "./UserMenu";

function Header() {
  const navigate = useNavigate();
  const user = useSelector((state) => state?.user);
  const [showUserMenu, setShowUserMenu] = useState(false);

  console.log("user from store", user);

  const redirectTologinPage = () => {
    navigate("/login");
  };
  const redirectToRegisterPage = () => {
    navigate("/register");
  };

  return (
    <header className="h-20 lg:shadow-md sticky top-0 bg-primaryLight">
      <div className="container mx-auto flex items-center justify-between h-full px-2">
        <Link to={"/"} className="text-xl font-bold ">
          <img
            src={Logo}
            alt="BookHive Logo"
            width={220}
            height={60}
            className="hidden lg:block"
          />
          <img
            src={Logo}
            alt="BookHive Logo"
            width={160}
            height={60}
            className="lg:hidden"
          />
        </Link>
        <div className="hidden lg:block">
          <Search />
        </div>
        <div className="">
          {/**this user icon only display in mobile version */}
          <button className="text-neutral-600 lg:hidden">
            <FaRegUserCircle size={25} />
          </button>
          {/**Desktop part*/}
          <div className="hidden lg:flex justify-between items-center gap-5">
            {user?._id ? (
              <div className="relative">
                <div
                  onClick={() => setShowUserMenu((prev) => !prev)}
                  className="flex select-none items-center gap-3 mx-5 cursor-pointer"
                >
                  <p className="">Account</p>
                  {showUserMenu ? (
                    <VscTriangleUp size={20} />
                  ) : (
                    <VscTriangleDown size={20} />
                  )}
                </div>
                {showUserMenu && (
                  <div className="absolute right-0 top-10">
                    <div className="bg-primaryDark rounded p-4 min-w-52 lg:shadow-lg">
                      <UserMenu />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              ((
                <button
                  className="bg-secondaryLight text-lg px-4 py-1 rounded-md hover:bg-secondaryDark"
                  onClick={redirectTologinPage}
                >
                  Log in
                </button>
              ),
              (
                <button
                  className="bg-secondaryLight text-lg px-4 py-1 rounded-md hover:bg-secondaryDark mr-6"
                  onClick={redirectToRegisterPage}
                >
                  Sign up
                </button>
              ))
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
