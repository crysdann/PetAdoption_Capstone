import React, { useState, useEffect } from "react";
import graphQLFetch from "../graphQLFetch";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [lostPets, setLostPets] = useState([]);
  const [adoptionDetails, setAdoptionDetails] = useState([]);
  const [successStories, setSuccessStories] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const showStep = (step) => {
    setCurrentStep(step);
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userid = localStorage.getItem("user_id");
        if (!userid) {
          throw new Error("User not logged in.");
        }

        const queries = [
          {
            query: `
              query GetLostPetsByUser($user_id: ID!) {
                        getLostPetsByUser(user_id: $user_id) {
                            _id
                            pet_name
                            pet_type
                            pet_breed
                            last_seen_location
                            last_seen_date
                            contact_name
                            contact_phone
                            contact_email
                            additional_info
                            pet_image
                        }
                    }
            `,
            variables: { user_id: userid },
            setter: setLostPets,
          },
          {
            query: `
              query GetAllPetsByUser($user_id: ID!) {
                    getAllPetsByUser(user_id: $user_id) {
                      _id
                      pet_name
                      pet_type
                      pet_age
                      pet_gender
                      pet_breed
                      vaccination_status
                      location
                      health_issues
                      pet_behaviour
                      pet_description
                      pet_image
                      pet_video
                }
              }
            `,
            variables: { user_id: userid },
            setter: setAdoptionDetails,
          },
          {
            query: `
              query GetUserDetails($_id: ID!) {
                getUserDetails(_id: $_id) {
                  _id
                  first_name
                  last_name
                  email
                  phone
                  password
                }
              }
            `,
            variables: { _id: userid },
            setter: setUserDetails,
          },
          {
            query: `
            query GetSuccessStoriesByUser($user_id: ID!) {
              getSuccessStoriesByUser(user_id: $user_id) {
                id
                petName
                description
                petPhotoUrl
              }
            }
          `,
            variables: { user_id: userid },
            setter: setSuccessStories,
          },
        ];

        for (const { query, variables, setter } of queries) {
          const response = await graphQLFetch(query, variables);
          if (!response) {
            throw new Error("Failed to fetch details.");
          }
          setter(
            response.getLostPetsByUser ||
            response.getAllPetsByUser ||
            response.getUserDetails ||
            response.getSuccessStoriesByUser
          );
        }
      } catch (error) {
        console.error("Error fetching details:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  // Update functionality for User information
  const handleUpdate = async () => {
    try {
      const { _id, first_name, last_name, email, phone, password } = userDetails;
      const mutation = `
        mutation UpdateUserDetails($_id: ID!, $first_name: String!, $last_name: String!, $email: String!, $phone: String!, $password: String!) {
          updateUserDetails(_id: $_id, first_name: $first_name, last_name: $last_name, email: $email, phone: $phone, password: $password) {
            _id
            first_name
            last_name
            email
            phone
            password
          }
        }
      `;

      const variables = { _id, first_name, last_name, email, phone, password };
      const response = await graphQLFetch(mutation, variables);

      if (response && response.updateUserDetails) {
        alert("Profile updated successfully!");
        setUserDetails(response.updateUserDetails);
      } else {
        alert("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("An error occurred while updating the profile.");
    }
  };


  const refreshPage = () => {
    window.location.reload();
  };
  // delete feature for adopt
  const handlePetDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this pet?"
    );
    if (confirmed) {
      try {
        // Define the GraphQL mutation query
        const query = `mutation adoptPetDelete($id: ID!) {
      adoptPetDelete(id: $id)
       }`;

        // Execute the GraphQL mutation to delete the pet
        const data = await graphQLFetch(query, { id });
        // Check if the deletion was successful
        if (data.adoptPetDelete) {
          alert("Pet deleted successfully");
          // Remove the deleted pet from the state
          setAdoptionDetails((prevDetails) =>
            prevDetails.filter((pet) => pet._id !== id)
          );
        } else {
          alert("Error deleting pet, try again");
        }
      } catch (error) {
        console.error("Error deleting pet:", error);
        alert("Failed to delete pet");
      }
    }
  };
  // delete feature for success stories
  const handleSuccessStoryDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this success story?");
    if (confirmed) {
      try {
        const query = `mutation deleteSuccessStory($id: ID!) {
          deleteSuccessStory(id: $id)
        }`;

        const data = await graphQLFetch(query, { id });
        if (data.deleteSuccessStory) {
          alert("Success story deleted successfully");
          setSuccessStories((prevStories) =>
            prevStories.filter((story) => story.id !== id)
          );
        } else {
          alert("Error deleting success story, try again");
        }
      } catch (error) {
        console.error("Error deleting success story:", error);
        alert("Failed to delete success story");
      }
    }
  };
  // delete feature for lost pets
  const handleLostPetDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this lost pet?");
    if (confirmed) {
      try {
        const query = `
          mutation deleteLostPet($id: ID!) {
            deleteLostPet(id: $id)
          }
        `;
        const variables = { id };

        const response = await graphQLFetch(query, variables);

        // Check if response is correctly formatted
        if (response && response.deleteLostPet) {
          alert("Lost pet deleted successfully");
          setLostPets((prevPets) =>
            prevPets.filter((pet) => pet._id !== id)
          );
        } else {
          alert("Error deleting lost pet, try again");
        }
      } catch (error) {
        console.error("Error deleting lost pet:", error);
        alert("Failed to delete lost pet");
      }
    }
  };


  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
                className={`text-gray-900 rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${currentStep === 1 ? "bg-primary-brown  text-white" : ""
                  }`}
                onClick={() => showStep(1)}
              >
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  About Me
                </div>
              </div>

              {/* Adoption */}
              <div
                id="Adoption"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${currentStep === 2 ? "bg-primary-brown  text-white" : ""
                  }`}
                onClick={() => showStep(2)}
              >
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  Adoption Details
                </div>
              </div>

              {/* Lost Pets */}
              <div
                id="lost_pets"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${currentStep === 3 ? "bg-primary-brown  text-white" : ""
                  }`}
                onClick={() => showStep(3)}
              >
                <div className="flex md:gap-2 sm:text-xl xs:text-md font-semibold dark:text-white">
                  Find your lost pets
                </div>
              </div>
              {/* Success Stories */}
              <div
                id="success_stories"
                className={`rounded-sm py-2 border-b-2 border-gray-200 dark:border-gray-600 pl-4 hover:bg-gray-400 hover:text-white hover:dark:bg-gray-500 cursor-pointer ${currentStep === 4 ? "bg-primary-brown  text-white" : ""
                  }`}
                onClick={() => showStep(4)}
              >
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
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userDetails.first_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Last Name */}
                    <div className="w-full">
                      <label
                        htmlFor="last_name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userDetails.last_name || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Profile Picture */}
                    <div className="w-full">
                      <label
                        htmlFor="profile_picture"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
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

                    {/* Email Address */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userDetails.email || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Phone Number */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userDetails.phone || ""}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Alternative Number */}
                    <div className="w-full mb-4">
                      <label
                        htmlFor="alt_phone"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
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
                    <div className="w-full mb-4 relative">
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Change Password
                      </label>
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userDetails.password}
                        onChange={handleChange}
                      />
                      <div
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        style={{ top: "1.75rem" }}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="w-full mb-4 relative">
                      <label
                        htmlFor="confirm_password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirm_password"
                        id="confirm_password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pr-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      />
                      <div
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        style={{ top: "1.75rem" }}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-500" />
                        )}
                      </div>
                    </div>
                    {/* Update  Button */}
                    <button
                      onClick={handleUpdate}
                      className="bg-primary-brown text-white font-semibold py-2 px-4 rounded-sm shadow-md hover:bg-primary-light-brown focus:outline-none"
                    >
                      Save Changes
                    </button>

                    <button
                      onClick={refreshPage}
                      className="bg-gray-400 text-white font-semibold py-2 px-4 rounded-sm shadow-md hover:bg-gray-500 focus:outline-none"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Adoption */}
              {currentStep === 2 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Want to post any pets for adoption...
                    </p>
                    <a
                      href="adoptdataform"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                    >
                      Add Adoption
                    </a>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {adoptionDetails.length > 0 ? (
                      adoptionDetails.map((adoption) =>
                        adoption ? (
                          <div
                            key={adoption._id}
                            className="bg-primary-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg hover:-translate-y-2"
                          >
                            {adoption.pet_image && (
                              <img
                                src={adoption.pet_image}
                                alt={adoption.pet_name}
                                className="w-full h-48 object-cover rounded-t-md mb-4"
                              />
                            )}
                            <div className="p-4">
                              <h2 className="text-xl font-semibold text-primary-dark mb-2">
                                {adoption.pet_name}
                              </h2>
                              <h3 className="text-sm text-primary-dark mb-2">
                                Age: {adoption.pet_age}
                              </h3>
                              <h3 className="text-sm text-primary-dark mb-2">
                                Type: {adoption.pet_type}
                              </h3>
                              <h3 className="text-sm text-primary-dark mb-2">
                                Pet Behaviour: {adoption.pet_behaviour}
                              </h3>
                              <div className="flex justify-start mt-4 space-x-2">
                                <Link
                                  to={`/edit-pet/${adoption._id}`}
                                  className="inline-block rounded text-sm bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                                >
                                  Edit
                                </Link>
                                <button
                                  onClick={() => handlePetDelete(adoption._id)}
                                  className="inline-block rounded text-sm bg-red-500 border-red-600 py-2 px-4 font-medium text-white shadow hover:bg-red-600 focus:outline-none focus:ring transition duration-200"
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-primary-dark">
                            Some adoption details are missing or incorrect.
                          </p>
                        )
                      )
                    ) : (
                      <p className="text-primary-dark">
                        No adoption details posted yet.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Lost Pets */}
              {currentStep === 3 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Haven't found your pets yet...
                    </p>
                    <a
                      href="LostPetForm"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                    >
                      Add Lost Pet
                    </a>
                  </div>
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {lostPets.length > 0 ? (
                      lostPets.map((pet) => (
                        <div
                          key={pet._id}
                          className="bg-primary-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg hover:-translate-y-2"
                        >
                          {pet.pet_image && (
                            <img
                              src={pet.pet_image}
                              alt={pet.pet_name}
                              className="w-full h-48 object-cover rounded-t-md mb-4"
                            />
                          )}
                          <div className="p-4">
                            <h2 className="text-xl font-semibold text-primary-dark mb-2">
                              {pet.pet_name}
                            </h2>
                            <h3 className="text-sm text-primary-dark mb-2">
                              Type: {pet.pet_type}
                            </h3>
                            <h3 className="text-sm text-primary-dark mb-2">
                              Last Seen Location: {pet.last_seen_location}
                            </h3>
                            <h3 className="text-sm text-primary-dark mb-2">
                              Last Seen Date:{" "}
                              {new Date(
                                pet.last_seen_date
                              ).toLocaleDateString()}
                            </h3>
                            <div className="flex justify-start mt-4 space-x-2">
                              <Link
                                to={`/edit-lost-pet/${pet._id}`}
                                className="inline-block rounded text-sm bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                              >
                                Edit
                              </Link>
                              <button
                                type="button"
                                onClick={() => handleLostPetDelete(pet._id)}
                                className="inline-block rounded text-sm bg-red-500 border-red-600 py-2 px-4 font-medium text-white shadow hover:bg-red-600 focus:outline-none focus:ring transition duration-200"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-primary-dark">No lost pets found.</p>
                    )}
                  </div>
                </div>
              )}
              {/* Step 4: Success Stories */}
              {currentStep === 4 && (
                <div className="md:w-[88%] xs:w-[92%] px-4 py-6">
                  <div className="flex items-center mb-4">
                    <p className="text-lg text-gray-700 mr-3">
                      Want to share your success story...
                    </p>
                    <a
                      href="successstoriesform"
                      className="inline-block rounded text-lg bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                    >
                      Share Your Story
                    </a>
                  </div>
                  {successStories.length > 0 ? (
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {successStories.map((story) => (
                        <div
                          key={story._id}
                          className="border p-4 rounded-lg shadow-lg"
                        >
                          <img
                            src={story.petPhotoUrl}
                            alt={story.petName}
                            className="w-full h-64 object-cover mb-2 rounded-lg"
                          />
                          <h2 className="text-xl font-semibold mb-2">
                            {story.petName}
                          </h2>
                          <p>
                            <strong>Description:</strong> {story.description}
                          </p>
                          <div className="flex justify-start mt-4 space-x-4">
                            <a
                              href="successstoryform"
                              className="inline-block rounded text-sm bg-primary-light-brown border-[#d2c8bc] py-2 px-4 font-medium text-primary-brown shadow hover:bg-primary-brown hover:border-[#866552] hover:text-white focus:outline-none focus:ring transition duration-200"
                            >
                              Edit
                            </a>
                            <button
                              type="button"
                              onClick={() => handleSuccessStoryDelete(story.id)}
                              className="inline-block rounded text-sm bg-red-500 border-red-600 py-2 px-4 font-medium text-white shadow hover:bg-red-600 focus:outline-none focus:ring transition duration-200"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">
                      No success stories available.
                    </p>
                  )}
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
