import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import bannerImage from "../assets/images/banner_img.jpg";
import petimage from "../assets/images/pet2.jpg";
import dogImg from "../assets/images/dog.png";
import catImg from "../assets/images/cat.png";
import allPetImg from "../assets/images/all_pet.png";
import otherPetImg from "../assets/images/other_pet.png";
import graphQLFetch from "../graphQLFetch";
import ReactPaginate from "react-paginate";

function Banner() {
  return (
    <section
      style={{ backgroundImage: `url(${bannerImage})` }}
      className="relative  bg-cover bg-top bg-no-repeat"
    >
      <div className="absolute inset-0 bg-white/75 md:bg-transparent md:from-white/95 md:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>
      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl text-center ltr:sm:text-left rtl:sm:text-right">
          <h1 className="text-3xl font-extrabold  sm:text-5xl">
            Adopt
            <strong className="block font-extrabold primary-light-brown">
              {" "}
              Give them a Home.{" "}
            </strong>
          </h1>

          <p className="mt-4 max-w-lg  sm:text-xl/relaxed">
            Adopting an animal is the most wonderful gift you can offer. We are
            excited to support you in finding your new best friend. Please
            explore the bios and photos of the animals below.
          </p>

          <div className="mt-8 flex justify-center gap-4 ">
            <a
              href="/adoptdataform"
              className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
            >
              Add to Adoption
            </a>

            {/* <a
              href="#"
              className="block w-full rounded bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto"
            >
              Learn More
            </a> */}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterPets() {

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
                onClick={() => handleSelect('/adopt/all')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={allPetImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                All Pets
              </li>
              <li
                onClick={() => handleSelect('/adopt/dog')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={dogImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                Dogs
              </li>
              <li
                onClick={() => handleSelect('/adopt/cat')}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-100"
              >
                <img src={catImg} alt="icon_petImage" className="w-6 h-6 mr-2" />
                Cats
              </li>
              <li
                onClick={() => handleSelect('/adopt/other')}
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
              to="/adopt/all"
              className="block p-4 shadow text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={allPetImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="mt-1 font-bold">All Pets</span>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to="/adopt/dog"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={dogImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Dogs</span>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to="/adopt/cat"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={catImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Cats</span>
            </Link>
          </div>
          <div className="w-1/2 md:w-1/4 p-2">
            <Link
              to="/adopt/other"
              className="block p-6 shadow  text-dark rounded-lg border-2 border-white hover:border-black transition h-full flex flex-col items-center"
            >
              <img
                src={otherPetImg}
                alt="icon_petImage"
                style={{ width: "4rem" }}
              ></img>
              <span className="font-bold">Others</span>
            </Link>
          </div>
        </div>
      </div>
    );
  
}

const PetCard = ({ pet }) => {
  const { pet_name, pet_age, pet_gender, pet_description, pet_image } = pet;

  // Use the first image URL if available, otherwise use a placeholder image
  const petImageUrl =
    pet_image && pet_image.length > 0 ? pet_image[0] : petimage;

  return (
    <article className="flex flex-col xl:flex-row bg-white transition hover:shadow-xl">
      <div className="sm:block sm:basis-56">
        <img
          alt="pet_image"
          src={petImageUrl}
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <h3 className="font-bold uppercase text-gray-900">{pet_name}</h3>
          <p className="text-sm font-bold text-dark">Age: {pet_age} yrs</p>
          <p className="text-sm font-bold text-dark">Gender: {pet_gender}</p>

          <p className="mt-2 text-md/relaxed text-gray-700 line-clamp-4">
            {pet_description}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <Link
            to={`/petdetails/${pet._id}`}
            className="block px-5 py-3 text-center text-primary-brown text-xs font-bold uppercase hover:text-rose-600 transition"
          >
            More Info...
          </Link>
        </div>
      </div>
    </article>
  );
};

const Paging = ({ items, itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = items.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(items.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems.map((pet) => (
        <div key={pet._id} className="rounded-lg m-5">
          <PetCard pet={pet} />
        </div>
      ))}
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
    </>
  );
};
const AdoptionList = () => {
  const [pets, setPets] = useState([]);
  const { filter } = useParams();
  const [filteredPets, setFilteredPets] = useState([]);
  const navigate = useNavigate();
  const itemsPerPage = 4;

  useEffect(() => {
    const fetchPets = async () => {
      const query = `
        query {
          getAllPets {
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
        const data = await graphQLFetch(query);
        if (!data || !data.getAllPets) {
          console.error("Error fetching pets");
          throw new Error("Failed to fetch pet details.");
        }

        setPets(data.getAllPets);

        let filtered = [];
        if (!filter || filter === "all") {
          filtered = data.getAllPets;
        } else {
          filtered = data.getAllPets.filter(
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
    if(filter)
       navigate(`/adopt/${filter}`);
  }, [filter, navigate]);

  if(filteredPets.length > 0)
  {
    return (
      <div className="pt-[9.1rem] pb-[2rem]">
        <Banner />
        <FilterPets />
        <div className="mx-7 p-5 md:grid md:grid-cols-2 md:gap-8 lg:mx-14">
          <Paging items={filteredPets} itemsPerPage={itemsPerPage} />
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="pt-[9.1rem] pb-[2rem]">
        <Banner />
        <FilterPets />
        <div className="mx-7 p-5 md:grid md:grid-cols-2 md:gap-8 lg:mx-14 flex items-center justify-center">
          <p className="mt-2 text-md/relaxed text-gray-700 line-clamp-4 text-center">
            No pets found!!
          </p>
        </div>
      </div>
    );
  }
  
};
export default AdoptionList;
