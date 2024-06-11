import React, { useState } from "react";

const SuccessStoriesForm = () => {
  const [petName, setPetName] = useState("");
  const [petPhoto, setPetPhoto] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted!");
    console.log("Pet Name:", petName);
    console.log("Pet Photo:", petPhoto);
    console.log("Description:", description);
    setPetName("");
    setPetPhoto("");
    setDescription("");
  };

  return (
    <div className="bg-primary-white">
      <h1 className="flex justify-center pt-[12rem] text-[3rem] font-bold text-[#644b3c] ">
        Share your Success Story
      </h1>
      <div className="max-w-xl mx-auto mt-8 mb-16 p-4 bg-white rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="petName"
              className="block text-sm font-medium text-gray-700">
              Pet Name
            </label>
            <input
              type="text"
              id="petName"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-primary-blue"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="petPhoto"
              className="block text-sm font-medium text-gray-700">
              Pet Photo
            </label>
            <input
              type="file"
              id="petPhoto"
              accept="image/*"
              onChange={(e) => setPetPhoto(e.target.files[0])}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-primary-blue"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring focus:ring-primary-blue"
              required></textarea>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-blue text-white rounded-md hover:bg-primary-dark-blue focus:outline-none focus:bg-primary-dark-blue">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuccessStoriesForm;
