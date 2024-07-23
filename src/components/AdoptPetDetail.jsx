import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
    <div className="pt-[12rem] pb-[2rem] mx-9 sm:mx-15 flex flex-col items-center">
      <PetCarousel pet_images={pet_images} />
      {pet && <PetInfo pet={pet} />}
    </div>
  );
};

export default PetDetails;
