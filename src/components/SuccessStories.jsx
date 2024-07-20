import React, { useEffect, useState } from "react";
import successstorieshero from "../assets/images/successstorieshero.jpg";
import Pagination from "../components/Pagination";
import { Link } from "react-router-dom";
import graphQLFetch from "../graphQLFetch";

const SuccessStories = () => {
  const [successStories, setSuccessStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSuccessStories = async () => {
    const query = `
    query {
      getSuccessStories {
        id
        petName
        description
        petPhotoUrl
      }
    }
  `;

    try {
      const result = await graphQLFetch(query);
      // console.log(`Fetched stories: ${JSON.stringify(result)}`);

      if (!result || !result.getSuccessStories) {
        console.error("No success stories found or result is null.");
        return [];
      }

      return result.getSuccessStories;
    } catch (error) {
      console.error("Error fetching stories:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stories = await fetchSuccessStories();
        setSuccessStories(stories);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching stories:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary-white">
      <div className="w-full pt-[146px]">
        <div className="max-h-[613px] relative">
          <div className="absolute w-full h-full text-gray-200 max-h-[613px] bg-black/40 flex flex-col justify-center md:pl-[3rem] sm:pl-[2rem]">
            <h1 className="px-4 text-5xl sm:text-5xl md:text-6xl font-bold font-dancing-script">
              Your <span>Pet Connect</span> story
            </h1>
            <h3 className="px-4 pt-4 text-[18px] w-[30rem] md:w-[45rem] sm:w-[35rem]">
              Sharing your Pet Connect experience can inspire others to adopt,
              find lost pets and bring joy to their homes. Your story can show
              the positive impact and spread the joy to inspire others!
            </h3>
            <Link
              to="/SuccessStoriesForm"
              className="ml-[16px] mt-[2rem] text-md block w-[15rem] rounded bg-rose-600 px-12 py-3 font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500">
              Share your story
            </Link>
          </div>
          <img
            src={successstorieshero}
            alt="success stories hero"
            className="w-full h-[613px] object-cover"
          />
          {/* Image by Lenka Novotná from Pixabay
          https://pixabay.com/photos/dog-labrador-pet-canine-companion-1861839/ */}
        </div>
      </div>
      <h1 className="flex justify-center pt-14 text-[3rem] font-bold text-[#644b3c] font-dancing-script">
        Success Stories
      </h1>
      <div className="max-w-[1640px] mx-auto p-10 py-12 grid md:grid-cols-1 sm:p-20 gap-6">
        {/* Pagination */}
        <Pagination items={successStories} itemsPerPage={4} />
      </div>
    </div>
  );
};

export default SuccessStories;
