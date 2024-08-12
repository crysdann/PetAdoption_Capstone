import React, { useState, useEffect } from "react";
import Adminimage from "../assets/images/admin.png";
import Admincover from "../assets/images/admincover.jpg";
import "../index.css";
import graphQLFetch from '../graphQLFetch';
import { Link } from 'react-router-dom';

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
  return result ? result.getUserDetails : null;
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
        setEditDetails({ ...userData, userId: userData._id }); 
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

// Function to update admin details using GraphQL
const updateAdminDetails = async (editDetails) => {
  const mutation = `
    mutation {
      updateAdminDetails(admin: {
        _id: "${editDetails.userId}",  
        first_name: "${editDetails.first_name}",
        last_name: "${editDetails.last_name}",
        email: "${editDetails.email}",
        phone: "${editDetails.phone}",
      }) {
        _id
        first_name
        last_name
        email
        phone
      }
    }
  `;
  console.log(mutation)
  const result = await graphQLFetch(mutation);
  console.log('Mutation result:', result); // Log the result to debug
  
  if (result && result.updateAdminDetails) {
    alert("Admin details successfully updated.");
    return result.updateAdminDetails;
  } else {
    console.error("Failed to update admin data.", result);
    alert("Failed to update admin data.");
    return null;
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevents default form submission behavior
    if (editDetails) {
      const updatedAdmin = await updateAdminDetails(editDetails);
      if (updatedAdmin) {
        setUserDetails(updatedAdmin);  // Update the userDetails with the updated data
        setActiveTab("Profile");  // Switch back to the Profile tab after save
      }
    }
  };

  //update Admin password
  const updateAdminPassword = async (userId, oldPassword, newPassword) => {
    const mutation = `
      mutation {
        updateAdminPassword(input:{
          userId: "${userId}", 
          oldPassword: "${oldPassword}", 
          newPassword: "${newPassword}"
      }) 
    }
    `;
    const result = await graphQLFetch(mutation);
    return result && result.updateAdminPassword ? result.updateAdminPassword : null;
  };
  
  const [passwordDetails, setPasswordDetails] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  
  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordDetails({ ...passwordDetails, [name]: value });
  };
  
  const handlePasswordChange = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('user_id');
    
    if (passwordDetails.newPassword !== passwordDetails.confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }
  
    const result = await updateAdminPassword(userId, passwordDetails.oldPassword, passwordDetails.newPassword);
    console.log("result",result);
    if (result) {
      alert("Password successfully changed.");
      setPasswordDetails({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
      setActiveTab("Profile");
    } else {
      alert("Failed to change password. Please check your old password.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Change Password":
        return (
          <form onSubmit={handlePasswordChange}>
            <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Current Password</dt>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwordDetails.oldPassword}
                  onChange={handlePasswordInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">New Password</dt>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordDetails.newPassword}
                  onChange={handlePasswordInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Confirm New Password</dt>
                <input
                  type="password"
                  name="confirmNewPassword"
                  value={passwordDetails.confirmNewPassword}
                  onChange={handlePasswordInputChange}
                  className="text-lg font-semibold  rounded px-2 py-1"
                />
              </div>
            </dl>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="mt-8 inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring"
              >
                Change Password
              </button>
            </div>
          </form>
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
          <form onSubmit={handleSubmit}>
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
                type="submit"
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
              <div className="text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg  dark:border-gray-600 dark:text-white h-full p-4">

                <Link
                    to="#"
                    onClick={() => setActiveTab("Profile")}
                    className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                      activeTab === "Profile"
                        ? "text-white bg-primary-brown dark:bg-primary-brown"
                        : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    }`}
                  >
                    Profile
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setActiveTab("Edit Profile")}
                    className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                      activeTab === "Edit Profile"
                        ? "text-white bg-primary-brown dark:bg-primary-brown"
                        : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    }`}
                  >
                    Edit Profile
                  </Link>
                  <Link
                    to="#"
                    onClick={() => setActiveTab("Change Password")}
                    className={`block w-full px-4 py-3 border-b border-gray-200 cursor-pointer ${
                      activeTab === "Change Password"
                        ? "text-white bg-primary-brown dark:bg-primary-brown"
                        : "hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    }`}
                  >
                    Change Password
                  </Link>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Adminprofile;


