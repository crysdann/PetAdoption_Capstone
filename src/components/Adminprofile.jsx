import React, { useState, useEffect } from "react";
import Adminimage from "../assets/images/admin.png";
import Admincover from "../assets/images/admincover.jpg";
import "../index.css";
import graphQLFetch from '../graphQLFetch';

// Function to fetch user details using GraphQL
const fetchUserDetails = async (userId) => {
  const query = `
    query {
      getUserDetails(_id: "${userId}") {
        _id
        first_name
        last_name
        email
        phone
        password
        user_type
      }
    }
  `;
  const result = await graphQLFetch(query);
  console.log("Fetched user details:", result);
  return result ? result.getUserDetails : null;
};

// Function to update user details using GraphQL
const updateUserDetails = async (userDetails) => {
  const mutation = `
    mutation {
      updateUserDetails(
        _id: "${userDetails._id}"
        first_name: "${userDetails.first_name}"
        last_name: "${userDetails.last_name}"
        email: "${userDetails.email}"
        phone: "${userDetails.phone}"
      ) {
        _id
        first_name
        last_name
        email
        phone
        user_type
      }
    }
  `;
  const result = await graphQLFetch(mutation);
  console.log("Updated user details:", result);
  return result ? result.updateUserDetails : null;
};

const Adminprofile = () => {
  const [activeTab, setActiveTab] = useState("Profile");
  const [userDetails, setUserDetails] = useState(null);
  const [editDetails, setEditDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const userId = localStorage.getItem('user_id');
      if (userId) {
        const userData = await fetchUserDetails(userId);
        setUserDetails(userData);
        setEditDetails(userData);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

  const handleSave = async () => {
    const updatedUser = await updateUserDetails(editDetails);
    if (updatedUser) {
      setUserDetails(updatedUser);
      setActiveTab("Profile");
    } else {
      console.error("Failed to update user details");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Change Password":
        return (
          <div>
            <form className="w-full max-w-sm">
              <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
                <div className="flex flex-col pb-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Old Password</dt>
                  <dd className="text-lg font-semibold">{userDetails.password}</dd>
                </div>
                <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">New Password</dt>
                  <dd className="text-lg font-semibold">*************</dd>
                </div>
                <div className="flex flex-col py-3">
                  <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Confirm New Password</dt>
                  <dd className="text-lg font-semibold">*************</dd>
                </div>
              </dl>
              <div className="flex items-center justify-between">
                <button className="mt-8 inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring" type="button">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        );

      case "Profile":
        return userDetails ? (
          <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
              <dd className="text-lg font-semibold">{userDetails.first_name}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
              <dd className="text-lg font-semibold">{userDetails.last_name}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
              <dd className="text-lg font-semibold">{userDetails.email}</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
              <dd className="text-lg font-semibold">{userDetails.phone}</dd>
            </div>
          </dl>
        ) : <p>Loading...</p>;

      case "Edit Profile":
        return editDetails ? (
          <form>
            <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                <input
                  type="text"
                  name="first_name"
                  value={editDetails.first_name}
                  onChange={handleInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                <input
                  type="text"
                  name="last_name"
                  value={editDetails.last_name}
                  onChange={handleInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                <input
                  type="email"
                  name="email"
                  value={editDetails.email}
                  onChange={handleInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                <input
                  type="text"
                  name="phone"
                  value={editDetails.phone}
                  onChange={handleInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
            </dl>
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={handleSave}
                className="mt-8 inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring"
              >
                Save
              </button>
            </div>
          </form>
        ) : <p>Loading...</p>;

      default:
        return null;
    }
  };

  return (
    <section className="w-full overflow-hidden dark:bg-gray-300">
      <div className="flex flex-col">
        <img
          src={Admincover}
          alt="Admin Cover"
          className="w-full xl:h-[20rem] lg:h-[18rem] md:h-[16rem] sm:h-[14rem] xs:h-[11rem]"
        />
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex flex-col sm:flex-row items-center">
          <img 
            src={Adminimage} 
            alt="Admin Profile"
            className="rounded-md lg:w-[12rem] lg:h-[8rem] md:w-[10rem] md:h-[10rem] sm:w-[6rem] sm:h-[6rem] xs:w-[4rem] xs:h-[4rem] relative lg:bottom-[5rem] sm:bottom-[4rem] xs:bottom-[3rem]"
          />
          <h1 className="w-full text-left my-4 sm:mx-4 xs:pl-4 text-gray-800 dark:text-white lg:text-4xl md:text-3xl sm:text-3xl xs:text-xl">
            {userDetails ? `${userDetails.first_name} ${userDetails.last_name}` : 'Loading...'}
          </h1>
        </div>
        <div className="sm:w-[80%] xs:w-[90%] mx-auto flex flex-col">
          <div className="flex flex-col sm:flex-row w-full h-full">
            <div className="w-full sm:w-2/3 h-full">{renderContent()}</div>
            <div className="w-full sm:w-1/3 h-full">
              <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white h-full p-4">
                <a
                  href="#"
                  onClick={() => setActiveTab("Profile")}
                  className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                    activeTab === "Profile" ? "text-white bg-primary-brown dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  }`}
                >
                  Profile
                </a>
                <a
                  href="#"
                  onClick={() => setActiveTab("Edit Profile")}
                  className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                    activeTab === "Edit Profile" ? "text-white bg-primary-brown dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  }`}
                >
                  Edit Profile
                </a>
                <a
                  href="#"
                  onClick={() => setActiveTab("Change Password")}
                  className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                    activeTab === "Change Password" ? "text-white bg-primary-brown dark:bg-gray-800" : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  }`}
                >
                  Change Password
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adminprofile;
