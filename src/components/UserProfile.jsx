import React, { useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasPostedAdoption, setHasPostedAdoption] = useState(false);
  const [hasPostedLost, setHasPostedLost] = useState(false);
  const [hasPostedSuccess, setHasPostedSuccess] = useState(false);
  const showStep = (step) => {
    setCurrentStep(step);
  };

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="pt-[9.1rem] pb-[2rem]">
      {/* Profile Information */}
      <div className="w-full md:p-6 xs:p-4 rounded-lg md:mt-0 sm:p-8 bg-primary-white">
        <div className="w-full mx-auto shadow-xl rounded-sm border border-gray-200 dark:border dark:border-gray-800">
          <h1 className="text-2xl font-semibold p-4 bg-primary-light-brown shadow-lg dark:bg-primary-light-brown dark:text-white rounded-sm">
            Profile
          </h1>

          {/* Steps */}
          <div className="w-full md:flex sm:gap-2 xs:gap-0">
            <div className="lg:w-[25%] md:w-[30%] xs:w-full bg-primary-white flex md:flex-col xs:flex-row xs:justify-center sm:gap-2">
              {/* About Me */}
              <div
                id="about_me"
                className={`text-gray-900 rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${
                  currentStep === 1 ? "bg-primary-brown  text-white" : ""
                }`}
                onClick={() => showStep(1)}>
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  About Me
                </div>
              </div>

              {/* Adoption */}
              <div
                id="Adoption"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${
                  currentStep === 2 ? "bg-primary-brown  text-white" : ""
                }`}
                onClick={() => showStep(2)}>
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  Adoption Details
                </div>
              </div>

              {/* Lost Pets */}
              <div
                id="lost_pets"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${
                  currentStep === 3 ? "bg-primary-brown  text-white" : ""
                }`}
                onClick={() => showStep(3)}>
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  Find your lost pets
                </div>
              </div>
              {/* Success Stories */}
              <div
                id="success_stories"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${
                  currentStep === 4 ? "bg-primary-brown  text-white" : ""
                }`}
                onClick={() => showStep(4)}>
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  Share your story
                </div>
              </div>
            </div>

            {/* Content for each step */}
            <div className="flex-1 bg-primary-white">
              {/* Step 1: About Me */}
              {currentStep === 1 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* First Name */}
                    <div className="w-full">
                      <label
                        htmlFor="first_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Last Name */}
                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Profile Picture */}
                    <div className="w-full">
                      <label
                        htmlFor="profile_picture"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        name="profile_picture"
                        id="profile_picture"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Date of Birth */}
                    <div className="w-full">
                      <label
                        htmlFor="dob"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        id="dob"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Gender */}
                    <div className="w-full">
                      <label
                        htmlFor="gender"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Gender
                      </label>
                      <select
                        name="gender"
                        id="gender"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    {/* Email Address */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Alternative Number */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="alt_phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Alternative Number
                      </label>
                      <input
                        type="text"
                        name="alt_phone"
                        id="alt_phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Change Password */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Change Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Confirm Password */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm_password"
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                    </div>
                    {/* Update  Button */}
                    <button
                      type="button"
                      className="block rounded text-xl bg-primary-light-brown border-[#d2c8bc] py-3 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200">
                      Update
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Adoption */}
              {currentStep === 2 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center  mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Want to post any pets for adoption...{" "}
                    </p>
                    <Link
                      to="/adoptdataform"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200">
                      Add Adoption
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-8">
                    {hasPostedAdoption ? (
                      <div className="p-4 bg-gray-100 rounded-md shadow-md">
                        {/* Adoption details card */}
                        <p>Adoption details go here...</p>
                      </div>
                    ) : (
                      <p>No adoption details posted yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Lost Pets */}
              {currentStep === 3 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center  mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Havent found your pets yet...{" "}
                    </p>
                    <a
                      href="LostPetForm"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200">
                      Add Lost Pet
                    </a>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-8">
                    {hasPostedLost ? (
                      <div className="p-4 bg-gray-100 rounded-md shadow-md">
                        {/* Lost pet details card */}
                        <p>Lost pet details go here...</p>
                      </div>
                    ) : (
                      <p>No lost pet details posted yet.</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 4: Success Stories */}
              {currentStep === 4 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center  mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Help others with your stories...{" "}
                    </p>
                    <Link
                      to="/SuccessStoriesForm"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200">
                      Add SuccessStories
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 mt-8">
                    {hasPostedSuccess ? (
                      <div className="p-4 bg-gray-100 rounded-md shadow-md">
                        {/* Success story details card */}
                        <p>Success story details go here...</p>
                      </div>
                    ) : (
                      <p>No success story details posted yet.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
