import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import graphQLFetch from "../graphQLFetch";
import petimage from "../assets/images/pet2.jpg";
import genderImg from "../assets/images/gender.png";
import heartImg from "../assets/images/heart.png";
import calendarImg from "../assets/images/calendar.png";
import pawImg from "../assets/images/pawprint.png";
import locationImg from "../assets/images/location.png";
import vaccinationImg from "../assets/images/vaccine.png";

const PetCarousel = ({ pet_images }) => {
  // Ensure there are at least 3 images
  const imagesToDisplay =
    pet_images.length >= 3
      ? pet_images
      : [...pet_images, ...pet_images, ...pet_images].slice(0, 3); // Take only the first 3 images

  return (
    <div className="carousel carousel-center rounded-box h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[30rem] max-w-screen-lg">
      {imagesToDisplay.map((image, index) => (
        <div className="carousel-item" key={index}>
          <img src={image || petimage} alt={`petImg-${index}`} />
        </div>
      ))}
    </div>
  );
};

const PetInfo = ({ pet }) => {
  return (
    <section>
      <div className="max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-2 lg:items-center lg:gap-x-16">
          <div className="mx-auto max-w-lg text-center lg:mx-0 ltr:lg:text-left rtl:lg:text-right">
            <h2 className="text-3xl font-bold sm:text-4xl">{pet.pet_name}</h2>

            <p className="mt-4 text-gray-600">{pet.pet_description}</p>

            <p className="mt-4 text-gray-600">
              <span className="text-md font-bold sm:text-lg text-black">
                Health:{" "}
              </span>{" "}
              {pet.health_issues}
            </p>

            <p className="mt-4 text-gray-600">
              <span className="text-md font-bold sm:text-lg text-black">
                Behaviour:{" "}
              </span>{" "}
              {pet.pet_behaviour}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={heartImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Pet type</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.pet_type}
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={genderImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Gender</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.pet_gender}
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img
                  className="h-6 w-6"
                  src={calendarImg}
                  alt="icon_image"
                ></img>
              </span>

              <h3 className="mt-2 font-bold ">Age</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.pet_age} years old
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img className="h-6 w-6" src={pawImg} alt="icon_image"></img>
              </span>

              <h3 className="mt-2 font-bold ">Breed</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.pet_breed}
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img
                  className="h-6 w-6"
                  src={locationImg}
                  alt="icon_image"
                ></img>
              </span>

              <h3 className="mt-2 font-bold ">Location</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.location}
              </p>
            </div>

            <div className="block rounded-xl border border-gray-100 p-4 shadow-sm hover:border-gray-200 hover:ring-1 hover:ring-gray-200 focus:outline-none focus:ring">
              <span className="inline-block rounded-lg bg-gray-50 p-3">
                <img
                  className="h-6 w-6"
                  src={vaccinationImg}
                  alt="icon_image"
                ></img>
              </span>

              <h3 className="mt-2 font-bold ">Vaccination</h3>

              <p className="sm:mt-1 sm:block sm:text-md sm:text-gray-600">
                {pet.vaccination_status}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ContactOwnerForm = ({ petDetails, userId }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Fetch user email
      const query = `
        query getUserDetails($userId: ID!) {
          getUserDetails(_id: $userId) {
            email
          }
        }
      `;
      const variables = { userId };
      const response = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          variables,
        }),
      });

      const result = await response.json();
      const userEmail = result.data.getUserDetails.email;

      const htmlContent = `
  <html>
  <body>
    <p>Hello,</p>

    <p>Here's the information about the pet:</p>

    <ul>
      <li><strong>Name:</strong> ${petDetails.pet_name}</li>
      <li><strong>Age:</strong> ${petDetails.pet_age}</li>
      <li><strong>Type:</strong> ${petDetails.pet_type}</li>
      <li><strong>Description:</strong> ${petDetails.pet_description}</li>
      <li><strong>Health Issues:</strong> ${petDetails.health_issues}</li>
      <li><strong>Behaviour:</strong> ${petDetails.pet_behaviour}</li>
      <li><strong>Location:</strong> ${petDetails.location}</li>
    </ul>

    <p><strong>Message:</strong></p>
    <p>${data.message}</p>

    <p><strong>Contact details of person interested in your pet:</strong></p>
    <ul>
      <li><strong>Name:</strong> ${data.name}</li>
      <li><strong>Phone:</strong> ${data.phone}</li>
      <li><strong>Email:</strong> ${data.email}</li>
    </ul>

    <p>Regards,<br>Pet Connect</p>
  </body>
  </html>
`;

      const emailResponse = await fetch(
        "http://localhost:4000/api/send-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: userEmail,
            subject: `Details about ${petDetails.pet_name}`,
            html: htmlContent,
          }),
        }
      );

      if (emailResponse.ok) {
        alert("Email sent successfully");
        reset(); // Reset the form to its initial state
      } else {
        alert("Error sending email");
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div className="p-6 mx-auto bg-primary-light-brown rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Contact the Pet Owner</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        <div className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Name is required" })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              Phone
            </label>
            <input
              type="text"
              id="phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\d{10}$/,
                  message: "Phone number must be exactly 10 digits",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email address",
                },
              })}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              {...register("message", { required: "Message is required" })}
              rows="6"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-opacity-50"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="inline-block shrink-0 rounded-md border bg-primary-brown px-12 py-3 text-sm font-medium text-white transition focus:outline-none focus:ring active:text-blue-500"
          >
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

const PetDetails = () => {
  const [pet, setPet] = useState(null);
  const [pet_images, setImages] = useState([]);
  const { petId } = useParams();

  useEffect(() => {
    const fetchPetDetails = async () => {
      if (!petId) return;

      const query = `
        query getPetDetails($petId: ID!) {
          getPetDetails(petId: $petId) {
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
        const variables = { petId };
        const data = await graphQLFetch(query, variables);

        if (!data || !data.getPetDetails) {
          console.error("Error fetching pet details");
          throw new Error("Failed to fetch pet details.");
        }

        setPet(data.getPetDetails);
        setImages(data.getPetDetails.pet_image);
      } catch (error) {
        console.error("Error fetching pet details:", error);
      }
    };

    fetchPetDetails();
  }, [petId]);

  return (
    <Fragment>
      <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15 flex flex-col items-center">
        <PetCarousel pet_images={pet_images} />
        {pet && <PetInfo pet={pet} />}
      </div>
      <div className=" pb-[2rem] mx-14 sm:mx-15">
        {pet && <ContactOwnerForm petDetails={pet} userId={pet.user_id} />}
      </div>
    </Fragment>
  );
};

export default PetDetails;
