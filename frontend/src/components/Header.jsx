import React from "react";
import Logo from "../assets/logo.png";
import Search from "./Search";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

function Header() {
  const navigate = useNavigate();

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
            <button
              className="bg-secondaryLight text-lg px-4 py-1 rounded-md hover:bg-secondaryDark"
              onClick={redirectTologinPage}
            >
              Log in
            </button>
            <button
              className="bg-secondaryLight text-lg px-4 py-1 rounded-md hover:bg-secondaryDark mr-6"
              onClick={redirectToRegisterPage}
            >
              Sign up
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
