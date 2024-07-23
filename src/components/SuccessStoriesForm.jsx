import React, { useState, useEffect } from "react";
import graphQLFetch from "../graphQLFetch";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const SuccessStoriesForm = () => {
  const [petName, setPetName] = useState("");
  const [petPhoto, setPetPhoto] = useState(null);
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Pet Name:", petName);
    console.log("Pet Photo:", petPhoto);
    console.log("Description:", description);

    try {
      let petPhotoUrl = "";

      if (petPhoto) {
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(petPhoto.name);
        const snapshot = await fileRef.put(petPhoto);
        petPhotoUrl = await snapshot.ref.getDownloadURL();
      }

      const userId = localStorage.getItem("user_id");
      if (!userId) {
        alert("Please login to continue");
        return;
      }
      const query = `
        mutation createSuccessStory($user_id: ID!, $petName: String!, $description: String!, $petPhotoUrl: String!) {
          createSuccessStory(input: {user_id: $user_id, petName: $petName, description: $description, petPhotoUrl: $petPhotoUrl}) {
            id
            petName
            description
            petPhotoUrl
          }
        }
      `;

      const variables = {
        user_id: userId,
        petName,
        description,
        petPhotoUrl,
      };

      const response = await graphQLFetch(query, variables);

      console.log("GraphQL Response:", response);

      if (response && response.createSuccessStory) {
        setPetName("");
        setPetPhoto(null);
        setDescription("");
        setSuccessMessage("Success story added!");
        setErrorMessage("");
      } else {
        throw new Error("Failed to create success story.");
      }
    } catch (error) {
      console.error("Error adding success story:", error);
      setErrorMessage("Error adding success story: " + error.message);
      setSuccessMessage("");
    }
  };

  return (
    <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">
      {isLoggedIn ? (
        <>
          <h1 className="flex justify-center pt-4 pb-2 text-[2rem] sm:text-[3rem] font-bold text-[#644b3c] ">
            Submit Your Success Story
          </h1>
          <form
            className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8"
            onSubmit={handleSubmit}>
            <div className="relative z-0 w-full mb-5 group">
              <input
                type="text"
                id="petName"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Pet name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                required
              />
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <textarea
                id="description"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required></textarea>
            </div>

            <div className="relative z-0 w-full mb-5 group">
              <input
                type="file"
                id="petPhoto"
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                onChange={(e) => setPetPhoto(e.target.files[0])}
                required
              />
            </div>

            <button
              type="submit"
              className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500">
              Submit
            </button>

            {successMessage && (
              <p className="text-green-500 text-sm mt-1">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
            )}
          </form>
        </>
      ) : (
        <div className="text-center">
          <p className="text-red-500 text-xl">
            Please login to submit your success story.
          </p>
          <a href="/login" className="text-blue-500 underline">
            Click here to login
          </a>
        </div>
      )}
    </div>
  );
};

export default SuccessStoriesForm;
