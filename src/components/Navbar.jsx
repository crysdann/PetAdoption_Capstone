import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import PetConnect from "../assets/images/petconnectlogo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleNav = () => {
    setNav(!nav);
  };

  const handleProfileDropdown = () => {
    setProfileDropdown(!profileDropdown);
  };

  const handleProfileClick = () => {
    if (userType === "admin") {
      navigate("/adminprofile");
    } else {
      navigate("/UserProfile");
    }
    setProfileDropdown(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_type");
    setIsLoggedIn(false);
    setUserType("");
    setProfileDropdown(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    const userType = localStorage.getItem("user_type");
    if (userId) {
      setIsLoggedIn(true);
      setUserType(userType || "");
    }
    const handleClickOutside = (event) => {
      if (
        !event.target.closest(".userprofiledropdown") &&
        !event.target.closest(".user-profile-icon")
      ) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      {/* Navbar Menu */}
      <div className="w-full min-h-[50px] flex justify-between items-center absolute z-10 bg-primary-white px-4">
        <div>
          <Link to="/">
            <img src={PetConnect} alt="logo" style={{ width: "6rem" }} />
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
          {isLoggedIn ? (
            <li
              className="p-4 text-lg cursor-pointer hover:text-primary-brown"
              onClick={handleLogout}>
              Logout
            </li>
          ) : (
            <li className="p-4 text-lg">
              <Link to="/login" className="hover:text-primary-brown">
                Login
              </Link>
            </li>
          )}
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
            <li className="p-4 text-2xl py-8" onClick={handleNav}>
              <Link to="/login"> Login </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Search Bar and User Icon */}
      <div className="w-full min-h-[50px] flex justify-between items-center absolute top-[6rem] bg-primary-light-brown px-4">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="border-b border-primary-brown outline-none"
          />
          <button type="submit" className="text-primary-brown ml-2">
            <IoSearch size={20} />
          </button>
        </form>
        {isLoggedIn && (
          <div
            className="text-2xl hover:text-primary-brown hover:bg-primary-white transition duration-300 cursor-pointer ml-4 mr-4 border rounded-3xl border-gray w-[3rem] h-[3rem] flex justify-center items-center user-profile-icon"
            onClick={handleProfileDropdown}>
            <FaRegUser />
          </div>
        )}
        {profileDropdown && isLoggedIn && (
          <div className="flex flex-col z-10 absolute top-[5rem] right-[1rem] w-[120px] rounded-2xl border-[1px] userprofiledropdown bg-primary-light-brown opacity-85">
            <ul className="flex flex-col text-[17px]">
              <li
                className="p-[10px] border-b border-white hover:text-primary-white cursor-pointer"
                onClick={handleProfileClick}>
                Profile
              </li>
              <li className="p-[10px] border-b border-white hover:text-primary-white cursor-pointer">
                Settings
              </li>
              <li
                className="p-[10px] hover:text-primary-white cursor-pointer"
                onClick={handleLogout}>
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
