import React from "react";
import { ImFacebook2 } from "react-icons/im";
import { GrInstagram } from "react-icons/gr";
import { FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t w-full bg-primaryLight bottom-0">
      <div className=" container mx-auto p-4 text-center flex flex-col lg:flex-row lg:justify-between gap-2">
        <p>&copy; 2024 BookHive. All rights reserved.</p>
        <div className="flex items-center gap-3 justify-center text-2xl">
          <a href="" className="hover:text-blue-500">
            <ImFacebook2 />
          </a>
          <a href="" className="hover:text-pink-700">
            <GrInstagram />
          </a>
          <a href="" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
