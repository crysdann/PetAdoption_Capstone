import React from "react";
import { useForm } from "react-hook-form";
import graphQLFetch from "../graphQLFetch";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const AdoptForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // console.log("data", data);
    // console.log(localStorage.getItem('user_id'));
    try {
      let files = data.floating_pet_image;

      // Ensure files is an array
      if (!Array.isArray(files)) {
        files = Array.from(files); // Convert to array using Array.from()
      }

      const images = [];
      const userid = localStorage.getItem("user_id");
      if (userid === null || userid === undefined || userid === "") {
        alert("Please login to continue");
      } else {
        const query = `
      mutation {
        createPet(pet: {
          user_id: "${userid}",
          pet_name: "${data.floating_pet_name}",
          pet_type: "${data.floating_pet_type}",
          pet_age: ${data.floating_pet_age},
          pet_gender: "${data.floating_pet_gender}",
          pet_breed: "${data.floating_pet_breed}",          
          vaccination_status: "${data.floating_pet_vaccine || ""}",
          location: "${data.floating_location}",
          health_issues: "${data.floating_health_issues || ""}",
          pet_behaviour: "${data.floating_pet_behaviour || ""}",
          pet_description: "${data.floating_pet_description || ""}",
          pet_video: ""
        }) {
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

        const response = await graphQLFetch(query);

        if (!response || !response.createPet) {
          throw new Error("Failed to create pet.");
        }

        const petId = response.createPet._id;

        // Upload images and insert their URLs in batches
        const uploadPromises = files.map(async (selectedFile) => {
          if (selectedFile) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(selectedFile.name);

            try {
              const snapshot = await fileRef.put(selectedFile);
              const downloadURL = await snapshot.ref.getDownloadURL();

              // Store the image URL in the images array
              images.push(downloadURL);
            } catch (error) {
              console.error("Error uploading file:", error);
              throw new Error("Failed to upload file.");
            }
          } else {
            console.log("No file selected.");
          }
        });

        // Wait for all file uploads to complete
        await Promise.all(uploadPromises);

        // Insert image URLs into the database in batches
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

        // Wait for all database insertions to complete
        await Promise.all(insertPromises);

        // Handle success
        alert("Pet and images successfully registered for adoption.");
        // Reset the form to its initial state
        reset();
      }
    } catch (error) {
      console.error("Error registering pet and images:", error);
      alert("Failed to register pet and images for adoption.");
    }
  };

  return (
    <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15">
      <h1 className="flex justify-center pt-4 pb-2 text-[2rem] sm:text-[3rem] font-bold text-[#644b3c] ">
        Register pets for adoption
      </h1>
      <form
        className="max-w-3xl mx-auto bg-white shadow-md rounded px-8 pt-8 pb-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              id="floating_pet_name"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Pet name"
              {...register("floating_pet_name", {
                required: "Pet name is required",
              })}
            />
            {/* <label
              htmlFor="floating_pet_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pet name
            </label> */}
            {errors.floating_pet_name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_name.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="floating_pet_type"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_type ? "border-red-500" : ""
              }`}
              {...register("floating_pet_type", {
                required: "Pet type is required",
              })}
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
            {/* <label
              htmlFor="floating_pet_age"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pet age
            </label> */}
            {errors.floating_pet_age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_age.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
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
            {/* <label
              htmlFor="floating_pet_name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Pet name
            </label> */}
            {errors.floating_pet_breed && (
              <p className="text-red-500 text-sm mt-1">
                {errors.floating_pet_breed.message}
              </p>
            )}
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <select
              id="floating_pet_vaccine"
              className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
                errors.floating_pet_vaccine ? "border-red-500" : ""
              }`}
              {...register("floating_pet_vaccine", {
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
          <input
            id="floating_location"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_location ? "border-red-500" : ""
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
          <textarea
            id="floating_health_issues"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_health_issues ? "border-red-500" : ""
            }`}
            placeholder="Health issues"
            {...register("floating_health_issues", {
              required: "Health issues are required",
            })}
          ></textarea>
          {/* <label
            htmlFor="floating_health_issues"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Health issues
          </label> */}
          {errors.floating_health_issues && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_health_issues.message}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="floating_pet_behaviour"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_pet_behaviour ? "border-red-500" : ""
            }`}
            placeholder="Pet behaviour"
            {...register("floating_pet_behaviour", {
              required: "Pet behaviour is required",
            })}
          ></textarea>
          {/* <label
            htmlFor="floating_pet_behaviour"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pet behaviour
          </label> */}
          {errors.floating_pet_behaviour && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_pet_behaviour.message}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <textarea
            id="floating_pet_description"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_pet_description ? "border-red-500" : ""
            }`}
            placeholder="Pet description"
            {...register("floating_pet_description", {
              required: "Pet description is required",
            })}
          ></textarea>
          {/* <label
            htmlFor="floating_pet_description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pet description
          </label> */}
          {errors.floating_pet_description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_pet_description.message}
            </p>
          )}
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input
            type="file"
            id="floating_pet_image"
            className={`w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline ${
              errors.floating_pet_image ? "border-red-500" : ""
            }`}
            placeholder="Pet images"
            {...register("floating_pet_image", {
              required: "Pet image is required",
            })}
            multiple
          />
          {/* <label
            htmlFor="floating_pet_image"
            className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Pet image
          </label> */}
          {errors.floating_pet_image && (
            <p className="text-red-500 text-sm mt-1">
              {errors.floating_pet_image.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AdoptForm;
