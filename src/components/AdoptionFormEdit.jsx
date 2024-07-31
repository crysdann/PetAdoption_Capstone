import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import graphQLFetch from "../graphQLFetch";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdoptFormEdit = () => {
  const navigate = useNavigate();
  const { petId } = useParams(); // Get petId from URL parameters
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    console.log("Inside useeffect");
    if (petId) {
      const fetchPetDetails = async () => {
        const query = `
          query {
            getPetDetails(petId: "${petId}") {
              _id
              user_id
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
        `;

        try {
          const response = await graphQLFetch(query);
          if (response && response.getPetDetails) {
            setInitialData(response.getPetDetails);
            Object.keys(response.getPetDetails).forEach((key) => {
              if (key === "pet_image") {
                // 'pet_image' set it to null
                setValue("floating_pet_image", null);
              } else {
                setValue(`floating_${key}`, response.getPetDetails[key]);
              }
            });
          }
        } catch (error) {
          console.error("Error fetching pet details:", error);
          alert("Failed to fetch pet details.");
        }
      };

      fetchPetDetails();
    }
  }, [petId, setValue]);

  const onSubmit = async (data) => {
    try {
      let files = data.floating_pet_image;

      if (files) {
        if (!Array.isArray(files)) {
          files = Array.from(files);
        }
      }

      const images = [];
      const query = `
  mutation UpdatePet($id: ID!, $pet: petUpdateInput!) {
    updatePet(id: $id, pet: $pet) {      
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
`;
      console.log(data);
      const variables = {
        id: petId,
        pet: {
          pet_age: data.floating_pet_age,
          pet_gender: data.floating_pet_gender,
          pet_breed: data.floating_pet_breed,
          vaccination_status: data.floating_vaccination_status,
          location: data.floating_location,
          health_issues: data.floating_health_issues,
          pet_behaviour: data.floating_pet_behaviour,
          pet_description: data.floating_pet_description,
          pet_video: "",
        },
      };

      const response = await graphQLFetch(query, variables);

      if (!response || !response.updatePet) {
        throw new Error("Failed to update pet.");
      }

      if (files) {
        const uploadPromises = files.map(async (selectedFile) => {
          if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            try {
              const snapshot = await fileRef.put(selectedFile);
              const downloadURL = await snapshot.ref.getDownloadURL();

              images.push(downloadURL);
            } catch (error) {
              console.error("Error uploading file:", error);
              throw new Error("Failed to upload file.");
            }
          }
        });

        await Promise.all(uploadPromises);

        const insertPromises = images.map(async (imageUrl) => {
          const insertImgQuery = `
          mutation InsertImage($img: ImageInput!) {
            insertImg(img: $img) {
              _id
              petId
              url
            }
          }
        `;

          const insertImgVariables = {
            img: {
              petId: petId,
              url: imageUrl,
            },
          };

          const insertImgResponse = await graphQLFetch(
            insertImgQuery,
            insertImgVariables
          );

          if (!insertImgResponse || !insertImgResponse.insertImg) {
            console.error("Failed to insert image:", insertImgResponse);
            throw new Error("Failed to insert image.");
          }
        });

        await Promise.all(insertPromises);
      }

      alert("Pet details successfully updated.");
      navigate("/UserProfile");
    } catch (error) {
      console.error("Error updating pet details:", error);
      alert("Failed to update pet details.");
    }
  };

  if (!initialData)
    return <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">Loading...</div>;

  return (
    <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">
      <h1 className="flex justify-center pt-4 pb-2 text-[2rem] sm:text-[3rem] font-bold text-[#644b3c] ">
        Edit Pet Details
      </h1>
      <p className="text-lg text-primary-dark mb-2">
            Here you can manage your pet details. Please make sure to review the information before making any updates.
          </p>
          <br></br>
      <form
        className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_pet_name"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Name
            </label>
            <input
              type="text"
              readOnly
              id="floating_pet_name"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Pet name"
              {...register("floating_pet_name", {
                required: "Pet name is required",
              })}
            />
            {errors.floating_pet_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_name.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_pet_type"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Type
            </label>
            <select
              id="floating_pet_type"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_type ? "border-red-500" : ""
              }`}
              {...register("floating_pet_type", {
                required: "Pet type is required",
              })}
              disabled
            >
              <option value="">Select Pet type</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="other">Other</option>
            </select>
            {errors.floating_pet_type && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_type.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_pet_age"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Age
            </label>
            <input
              type="number"
              id="floating_pet_age"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_age ? "border-red-500" : ""
              }`}
              placeholder="Pet age"
              {...register("floating_pet_age", {
                required: "Pet age is required",
                min: { value: 0, message: "Age must be a positive number" },
              })}
            />
            {errors.floating_pet_age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_age.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_pet_gender"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Gender
            </label>
            <select
              id="floating_pet_gender"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_gender ? "border-red-500" : ""
              }`}
              {...register("floating_pet_gender", {
                required: "Pet gender is required",
              })}
            >
              <option value="">Select Pet gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            {errors.floating_pet_gender && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_gender.message}
              </p>
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_pet_breed"
              className="block text-sm font-medium text-gray-700"
            >
              Pet Breed
            </label>
            <input
              type="text"
              id="floating_pet_breed"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_breed ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Pet breed"
              {...register("floating_pet_breed", {
                required: "Pet breed is required",
              })}
            />
            {errors.floating_pet_breed && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_breed.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <label
              htmlFor="floating_vaccination_status"
              className="block text-sm font-medium text-gray-700"
            >
              Vaccination status
            </label>
            <select
              id="floating_vaccination_status"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_vaccination_status ? "border-red-500" : ""
              }`}
              {...register("floating_vaccination_status", {
                required: "Pet Vaccination status is required",
              })}
            >
              <option value="">Select vaccination status</option>
              <option value="Up to date">Up to date</option>
              <option value="Pending">Pending</option>
              <option value="Not started">Not started</option>
              <option value="Unknown">Unknown</option>
            </select>
            {errors.floating_pet_vaccine && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_vaccine.message}
              </p>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            id="floating_location"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_location ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Location"
            {...register("floating_location", {
              required: "Location is required",
            })}
          />
          {errors.floating_location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_location.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_health_issues"
            className="block text-sm font-medium text-gray-700"
          >
            Health Issues
          </label>
          <textarea
            id="floating_health_issues"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_health_issues ? "border-red-500" : ""
            }`}
            placeholder="Health issues"
            rows="3"
            {...register("floating_health_issues")}
          />
          {errors.floating_health_issues && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_health_issues.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_pet_behaviour"
            className="block text-sm font-medium text-gray-700"
          >
            Pet Behaviour
          </label>
          <textarea
            id="floating_pet_behaviour"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_pet_behaviour ? "border-red-500" : ""
            }`}
            placeholder="Pet behaviour"
            rows="3"
            {...register("floating_pet_behaviour")}
          />
          {errors.floating_pet_behaviour && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_pet_behaviour.message}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_pet_description"
            className="block text-sm font-medium text-gray-700"
          >
            Pet Description
          </label>
          <textarea
            id="floating_pet_description"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_pet_description ? "border-red-500" : ""
            }`}
            placeholder="Pet description"
            rows="4"
            {...register("floating_pet_description")}
          />
          {errors.floating_pet_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_pet_description.message}
            </p>
          )}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <label
            htmlFor="floating_pet_image"
            className="block text-sm font-medium text-gray-700"
          >
            Upload more Images
          </label>
          <input
            type="file"
            id="floating_pet_image"
            className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none"
            {...register("floating_pet_image")}
            multiple
          />
        </div>
        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
        >
          Update Pet
        </button>
        <Link
          to={`/UserProfile`}
          className="inline-block shrink-0 rounded-md border bg-primary-light-brown mx-2 px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default AdoptFormEdit;
