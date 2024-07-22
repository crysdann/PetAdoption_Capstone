import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import ListBanner from "../assets/images/listbanner.jpg";
import petimage from "../assets/images/pet2.jpg";
import dogImg from "../assets/images/dog.png";
import catImg from "../assets/images/cat.png";
import allPetImg from "../assets/images/all_pet.png";
import otherPetImg from "../assets/images/other_pet.png";
import graphQLFetch from "../graphQLFetch";
import ReactPaginate from "react-paginate";

const PetCard = ({ pet }) => {
  const {
    pet_name,
    pet_type,
    last_seen_location,
    last_seen_date,
    additional_info,
    contact_name,
    contact_phone,
    pet_image,
  } = pet;

  const petImageUrl =
    pet_image && pet_image.length > 0 ? pet_image[0] : petimage;

  return (
    <div className="bg-primary-white rounded-lg shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg hover:-translate-y-2">
      <div className="overflow-hidden">
        <img
          src={petImageUrl}
          alt={pet_name}
          className="w-full h-48 object-cover transition duration-500 transform scale-100"
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{pet_name}</h2>
        <p className="text-primary-dark mb-2">
          <strong>Type: </strong>
          {pet_type}
        </p>
        <p className="text-primary-dark mb-2">
          <strong>Last Seen Location: </strong>
          {last_seen_location}
        </p>
        <p className="text-primary-dark mb-2">
          <strong>Last Seen Date: </strong>
          {last_seen_date}
        </p>
        <p className="text-primary-dark mb-2">
          <strong>Contact Name: </strong>
          {contact_name}
        </p>
        <p className="text-primary-dark mb-2">
          <strong>Contact Phone: </strong>
          {contact_phone}
        </p>
        <p className="text-primary-dark mb-2">
          <strong>Additional Info: </strong>
          {additional_info}
        </p>
      </div>
    </div>
  );
};

const Banner = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${ListBanner})`,
      }}
      className="relative bg-cover bg-top bg-no-repeat"
    >
      <div className="absolute inset-0 sm:bg-transparent sm:black/90 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold sm:text-5xl font-dancing-script text-primary-white">
            Pet Reunite
            <strong className="block italic text-xl text-primary-white font-josefin mt-4">
              Together Again.
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-primary-white sm:text-2xl/relaxed">
            When I look into the eyes of an animal I do not see an animal. I see a living being.
            I see a friend. I feel a soul.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              to="/lostpetform"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Find Your Pet
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const FilterPets = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSelect = (value) => {
    window.location.href = value;
  };

  if (isMobile) {
    return (
      <div className="container mx-auto mt-8 flex justify-center">
        <div className="relative w-3/4 md:w-1/2 lg:w-1/3">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="block w-full p-4 border-2 border-gray-300 rounded-lg shadow bg-white"
          >
            Filter pets
          </button>
          {dropdownOpen && (
            <ul className="absolute w-full border-2 border-gray-300 rounded-lg shadow bg-white z-10">
              <li
                onClick={() => handleSelect('/lostpets/all')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={allPetImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                All Pets
              </li>
              <li
                onClick={() => handleSelect('/lostpets/dog')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={dogImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                Dogs
              </li>
              <li
                onClick={() => handleSelect('/lostpets/cat')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={catImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                Cats
              </li>
              <li
                onClick={() => handleSelect('/lostpets/other')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={otherPetImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                Others
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8 flex justify-center">
      <div className="flex flex-wrap -m-2 justify-center w-7/12">
        <div className="w-1/2 md:w-1/4 p-2">
          <Link
            to="/lostpets/all"
            className="block p-4 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
          >
            <img
              src={allPetImg}
              alt="icon_petImage"
              style={{ width: "4rem" }}
            />
            <span className="mt-1 font-bold">All Pets</span>
          </Link>
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
          <Link
            to="/lostpets/dog"
            className="block p-6 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
          >
            <img
              src={dogImg}
              alt="icon_petImage"
              style={{ width: "4rem" }}
            />
            <span className="font-bold">Dogs</span>
          </Link>
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
          <Link
            to="/lostpets/cat"
            className="block p-6 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
          >
            <img
              src={catImg}
              alt="icon_petImage"
              style={{ width: "4rem" }}
            />
            <span className="font-bold">Cats</span>
          </Link>
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
          <Link
            to="/lostpets/other"
            className="block p-6 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
          >
            <img
              src={otherPetImg}
              alt="icon_petImage"
              style={{ width: "4rem" }}
            />
            <span className="font-bold">Others</span>
          </Link>
        </div>
      </div>
    </div>
  );
};


const LostPetPage = () => {
  const [pets, setPets] = useState([]);
  const { filter } = useParams();
  const [filteredPets, setFilteredPets] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const navigate = useNavigate();
  const pageCount = Math.ceil(filteredPets.length / itemsPerPage);

  useEffect(() => {
    const fetchPets = async () => {
      const query = `
        query {
          getLostPets {
            _id
            user_id
            pet_name
            pet_type
            last_seen_location
            last_seen_date
            contact_name
            contact_phone
            additional_info
            pet_image
          }
        }`;

      try {
        const data = await graphQLFetch(query);
        if (!data || !data.getLostPets) {
          console.error("Error fetching pets");
          throw new Error("Failed to fetch pet details.");
        }

        setPets(data.getLostPets);

        let filtered = [];
        if (!filter || filter === "all") {
          filtered = data.getLostPets;
        } else {
          filtered = data.getLostPets.filter(
            (pet) => pet.pet_type.toLowerCase() === filter.toLowerCase()
          );
        }
        setFilteredPets(filtered);
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };

    fetchPets();
  }, [filter]);

  useEffect(() => {
    if (filter) navigate(`/lostpets/${filter}`);
  }, [filter, navigate]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const currentItems = filteredPets.slice(startIndex, startIndex + itemsPerPage);


  return (
    <div className="pt-[9.1rem] pb-[2rem]">
      <Banner />
      <FilterPets />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentItems.map((pet) => (
            <PetCard key={pet._id} pet={pet} />
          ))}
        </div>
      </div>
      <div className="w-full col-span-2 flex justify-center mt-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel=">>"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="<<"
          renderOnZeroPageCount={null}
          containerClassName="pagination-ul"
          pageClassName="page-item-li"
          pageLinkClassName="page-link-a"
          previousClassName="page-item"
          nextClassName="page-item"
          breakClassName="page-item"
          activeClassName="selected"
          disabledClassName="disabled"
        />
      </div>
    </div>
  );
};


export default LostPetPage;
