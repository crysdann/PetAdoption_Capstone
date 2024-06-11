import React, { useState } from "react";
import Adminimage from "../assets/images/admin.png";
import Admincover from "../assets/images/admincover.jpg";
import "../index.css";

const Adminprofile = () => {
  const [activeTab, setActiveTab] = useState("Profile");

  const renderContent = () => {
    switch (activeTab) {
      //  case "Change Password":
      //   return (
      //     <div className="w-full flex flex-col items-center">
      //       <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Change Password</h2>
      //       <form className="w-full max-w-sm">
      //         <div className="mb-4">
      //           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="oldPassword">
      //             Old Password
      //           </label>
      //           <input
      //             type="password"
      //             id="oldPassword"
      //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
      //           />
      //         </div>
      //         <div className="mb-4">
      //           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="newPassword">
      //             New Password
      //           </label>
      //           <input
      //             type="password"
      //             id="newPassword"
      //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
      //           />
      //         </div>
      //         <div className="mb-6">
      //           <label className="block text-gray-700 dark:text-white text-sm font-bold mb-2" htmlFor="confirmPassword">
      //             Confirm New Password
      //           </label>
      //           <input
      //             type="password"
      //             id="confirmPassword"
      //             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
      //           />
      //         </div>
      //         <div className="flex items-center justify-between">
      //           <button
      //             className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      //             type="button"
      //           >
      //             Change Password
      //           </button>
      //         </div>
      //       </form>
      //     </div>
      //   );

      case "Change Password":
        return (
          <div>
            {/* <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Change Password</h2> */}
            <form className="w-full max-w-sm">
            <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Old Password</dt>
              <dd className="text-lg font-semibold">**************</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">New Password</dt>
              <dd className="text-lg font-semibold">*************</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400"> Confirm New Password</dt>
              <dd className="text-lg font-semibold">*************</dd>
            </div>
            </dl>
              <div className="flex items-center justify-between">
                <button className="mt-8 inline-block rounded bg-primary-brown px-12 py-3 text-sm font-medium text-white focus:outline-none focus:ring"  type="button">
                  Change Password
                </button>
              </div>
            </form>
          </div>
        );

      case "Profile":
        return (
          <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
            <div className="flex flex-col pb-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
              <dd className="text-lg font-semibold">Samuel</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
              <dd className="text-lg font-semibold">Abera</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
              <dd className="text-lg font-semibold">samuelabera87@gmail.com</dd>
            </div>
            <div className="flex flex-col py-3">
              <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
              <dd className="text-lg font-semibold">+251913****30</dd>
            </div>
          </dl>
        );

        case "Edit Profile":
          return (
            <dl className="text-gray-900 divide-y divide-gray-10 dark:text-white dt-text">
              <div className="flex flex-col pb-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">First Name</dt>
                <dd className="text-lg font-semibold">Samuel</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Last Name</dt>
                <dd className="text-lg font-semibold">Abera</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Email</dt>
                <dd className="text-lg font-semibold">samuelabera87@gmail.com</dd>
              </div>
              <div className="flex flex-col py-3">
                <dt className="mb-1 text-gray-500 md:text-lg dark:text-gray-400">Phone Number</dt>
                <dd className="text-lg font-semibold">+251913****30</dd>
              </div>
            </dl>
          );
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
          Samuel Abera
        </h1>
      </div>
      <div className="xl:w-[80%] lg:w-[90%] md:w-[90%] sm:w-[92%] xs:w-[90%] mx-auto flex flex-col gap-4 items-center relative lg:-top-8 md:-top-6 sm:-top-4 xs:-top-4 py-8">
        <div className="w-full flex sm:flex-row xs:flex-col gap-4 text-left h-full">
          <div className="w-full sm:w-2/3 pb-[4rem] h-full">{renderContent()}</div>
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
                  activeTab === "Change Password" ? "text-white bg-primary-brown dark:bg-gray-800" : "hover:bg-gray-100 hover:text-gray dark:hover:bg-gray-600 dark:hover:text-white"
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


