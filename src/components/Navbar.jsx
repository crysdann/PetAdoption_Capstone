import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import PetConnect from "../assets/images/petconnectlogo.png";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className="w-full min-h-[50px] flex justify-between items-center absolute z-10 sm:bg-primary-white px-4">
      <div>
        <img src={PetConnect} alt="logo" style={{ width: "6rem" }}></img>
      </div>
      <ul className="hidden sm:flex font-bold">
        <li className="p-4 text-lg">
          <a href="/" className="hover:primary-light-brown">
            Home
          </a>
        </li>
        <li className="p-4 text-lg">
          <a href="/" className="hover:primary-light-brown">
            Adopt
          </a>
        </li>
        <li className="p-4 text-lg">
          <a href="/" className="hover:primary-light-brown">
            Lost pets
          </a>
        </li>
        <li className="p-4 text-lg">
          <a href="/" className="hover:primary-light-brown">
            Success Stories
          </a>
        </li>
      </ul>
      <div className="hidden sm:flex items-center p-4 space-x-4">
        <IoSearch className="text-2xl hover:primary-light-brown" />
        <FaRegUser className="text-2xl hover:primary-light-brown" />
      </div>
      {/* Hamburger icon */}
      <div className="sm:hidden z-10 ml-auto ">
        <FaBars
          size={20}
          className="cursor-pointer text-gray-400"
          onClick={handleNav}
        />
      </div>
      {/* Mobile Menu */}
      <div
        className={`${
          nav ? "left-0" : "left-[-100%]"
        } overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 top-0 w-full h-screen bg-black/90 py-7 flex flex-col`}>
        <ul className="h-full w-full text-center pt-12">
          <li className="p-4 text-2xl py-8">
            <a href="/">Home</a>
          </li>
          <li className="p-4 text-2xl py-8">
            <a href="/">Adopt</a>
          </li>
          <li className="p-4 text-2xl py-8">
            <a href="/">Lost pets</a>
          </li>
          <li className="p-4 text-2xl py-8">
            <a href="/">Success Stories</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
