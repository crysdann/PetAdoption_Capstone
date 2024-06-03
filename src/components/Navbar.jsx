import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import PetConnect from "../assets/images/petconnectlogo.png";
import { Link } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };
  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".userprofiledropdown") &&
        !event.target.closest(".user-profile-icon")
      ) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  });

  return (
    <div>
      {/* Navbar Menu */}
      <div className="w-full min-h-[50px] flex justify-between items-center absolute z-10 bg-primary-white px-4">
        <div>
          <Link to="/">
            <img src={PetConnect} alt="logo" style={{ width: "6rem" }}></img>
          </Link>
        </div>
        <ul className="hidden sm:flex font-bold flex-grow justify-center">
          <li className="p-4 text-lg">
            <Link to="/" className="hover:text-primary-brown">
              Home
            </Link>
          </li>
          <li className="p-4 text-lg">
            <Link to="/adopt" className="hover:text-primary-brown">
              Adopt
            </Link>
          </li>
          <li className="p-4 text-lg">
            <Link to="/lostpets" className="hover:text-primary-brown">
              Lost pets
            </Link>
          </li>
          <li className="p-4 text-lg">
            <Link to="/successstories" className="hover:text-primary-brown">
              Success Stories
            </Link>
          </li>
        </ul>
        <div className="flex items-center p-4 space-x-4 ml-auto sm:ml-0">
          <div className="sm:hidden">
            <FaBars
              size={20}
              className="cursor-pointer text-gray-400"
              onClick={handleNav}
            />
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`${
            nav ? "left-0" : "left-[-100%]"
          } overflow-y-hidden md:hidden ease-in duration-300 absolute text-gray-300 top-0 w-full h-screen bg-black/90 py-7 flex flex-col`}>
          <ul className="h-full w-full text-center pt-12">
            <li className="p-4 text-2xl py-8" onClick={handleNav}>
              <Link to="/">Home</Link>
            </li>
            <li className="p-4 text-2xl py-8" onClick={handleNav}>
              <Link to="/adopt">Adopt</Link>
            </li>
            <li className="p-4 text-2xl py-8" onClick={handleNav}>
              <Link to="/lostpets">Lost pets</Link>
            </li>
            <li className="p-4 text-2xl py-8" onClick={handleNav}>
              <Link to="/successstories">Success Stories</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar and User Icon */}
      <div className="w-full min-h-[50px] flex justify-between items-center absolute top-[6rem] bg-primary-light-brown px-4">
        <form action="" className="relative pt-[5px] pb-[5px] w-[20rem]">
          <div className="relative w-full flex items-center text-gray-400 focus-within:text-gray-600">
            <IoSearch className="w-5 h-5 absolute ml-3 pointer-events-none" />
            <input
              type="text"
              name="search"
              placeholder="Search here"
              autoComplete="off"
              aria-label="search here"
              className="pr-3 pl-10 py-2 w-full font-semibold rounded-3xl border-none ring-1 ring-gray-300 focus:ring-gray-600 focus:ring-1 outline-none"
            />
          </div>
        </form>
        <div
          className="text-2xl hover:text-primary-brown hover:bg-primary-white transition duration-300  cursor-pointer ml-4 mr-4 border rounded-3xl border-gray w-[3rem] h-[3rem] flex justify-center items-center 
          user-profile-icon"
          onClick={handleProfileDropdown}>
          <FaRegUser />
        </div>
        {profileDropdown && (
          <div className="flex flex-col absolute top-[5rem] right-[1rem] w-[120px] rounded-2xl border-[1px] userprofiledropdown bg-primary-light-brown opacity-85">
            <ul className="flex flex-col text-[17px]">
              <li className="p-[10px] border-b border-white hover:text-primary-white cursor-pointer">
                Profile
              </li>
              <li className="p-[10px] border-b border-white hover:text-primary-white cursor-pointer">
                Settings
              </li>
              <li className="p-[10px] hover:text-primary-white cursor-pointer">
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
