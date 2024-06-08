import React from "react";
import ListBanner from "../assets/images/listbanner.jpg";
import Charlie from "../assets/images/charlie.jpg";
import Bella from "../assets/images/bella.jpg";
import Rocky from "../assets/images/rocky.jpg";
import Luna from "../assets/images/luna.jpg";
import dogImg from "../assets/images/dog.png";
import catImg from "../assets/images/cat.png";
import allPetImg from "../assets/images/all_pet.png";
import otherPetImg from "../assets/images/other_pet.png";

const LostPetPage = () => {
  const petData = [
    {
      name: 'Charlie',
      species: 'Dog',
      description: 'A friendly golden retriever with a wagging tail.',
      lastSeen: 'Last seen on Main Street',
      contactInfo: 'Contact: 555-1234, buddy@example.com',
      image: Charlie,
    },
    {
      name: 'Bella',
      species: 'Cat',
      description: 'A playful tabby cat with a love for catnip.',
      lastSeen: 'Last seen in Waterloo park.',
      contactInfo: 'Contact: 555-5678, whiskers@example.com',
      image: Bella,
    },
    {
      name: 'Rocky',
      species: 'Dog',
      description: 'white fur,Loves to run and very friendly..',
      lastSeen: 'Last seen in the neighborhood on Oak Avenue.',
      contactInfo: 'Contact: 555-5678, whiskers@example.com',
      image: Rocky,
    },
    {
      name: 'Luna',
      species: 'Cat',
      description: 'White fur with brown patches. Very curious and playful.',
      lastSeen: 'Maple Avenue',
      contact: '555-4321',
      image: Luna,
    },
  ];

  const Banner = () => {
    return (
      <section
        style={{
          backgroundImage: `url(${ListBanner})`
        }}
        className="relative bg-cover bg-top bg-no-repeat"
      >
        <div className="absolute inset-0  sm:bg-transparent sm:black/90 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl font-dancing-script text-primary-white">
              Pet Reunite
              <strong className="block italic text-xl text-primary-white font-josefin mt-4 ">
                {" "}
                Together Again.{" "}
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-primary-white sm:text-2xl/relaxed  ">
              When I look into the eyes of an animal I do not see an animal. I see a living being.
              I see a friend. I feel a soul.
            </p>
            <div className="mt-8 flex justify-center">
              <a
                href="#"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Find Your Pet
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  };
  function FilterPets() {
    return (
      <div className="container mx-auto mt-8 flex justify-center">
        <div className="flex flex-wrap -m-2 justify-center w-7/12">
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <a
              href="#"
              className="block p-4 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={allPetImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="mt-1 font-bold">All Pets</span>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <a
              href="#"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={dogImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Dogs</span>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <a
              href="#"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={catImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Cats</span>
            </a>
          </div>
          <div className="w-full sm:w-1/2 md:w-1/4 p-2">
            <a
              href="#"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={otherPetImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Others</span>
            </a>
          </div>
        </div>
      </div>
    );
  }

  const Paging = () => {
    return (
      <div className="inline-flex justify-center gap-1 w-full">
        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>

        <div>
          <label for="PaginationPage" className="sr-only">
            Page
          </label>

          <input
            type="number"
            className="h-8 w-12 rounded border border-gray-100 bg-white p-0 text-center text-xs font-medium text-gray-900 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
            min="1"
            value="2"
            id="PaginationPage"
          />
        </div>

        <a
          href="#"
          className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
        >
          <span className="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </a>
      </div>
    );
  };


  return (
    <div className="pt-[9.1rem] pb-[2rem]">

      {/* Cover Section */}
      <Banner />
      <FilterPets />
      {/* Pet Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {petData.map((pet, index) => (
            <div key={index} className="bg-primary-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg hover:-translate-y-2">
              <div className="overflow-hidden">
                <img
                  src={pet.image}
                  alt={pet.name}
                  className="w-full h-48 object-cover transition duration-500 transform scale-100 hover:scale-90"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{pet.name}</h2>
                <p className="text-primary-dark mb-2"><strong>Species: </strong>{pet.species}</p>
                <p className="text-primary-dark mb-2"><strong>Description: </strong>{pet.description}</p>
                <p className="text-primary-dark mb-2"><strong>Last Seen: </strong>{pet.lastSeen}</p>
                <p className="text-primary-dark"><strong>Contact: </strong>{pet.contactInfo}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Paging />
    </div>
  );
};

export default LostPetPage;

