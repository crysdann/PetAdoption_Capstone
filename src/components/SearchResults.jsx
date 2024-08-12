import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import graphQLFetch from "../graphQLFetch";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const SearchResults = () => {
  const query = useQuery();
  const searchQuery = query.get("query");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      const searchQueryText = `
        query($searchQuery: String!) {
          searchSuccessStories(searchQuery: $searchQuery) {
            id
            petName
            description
            petPhotoUrl
          }
          searchAdoptPets(searchQuery: $searchQuery) {
            pet_name
            pet_image
            pet_type
            pet_age
            pet_gender
            pet_breed
          }
        }
      `;

      const variables = { searchQuery };

      try {
        const result = await graphQLFetch(searchQueryText, variables);
        if (result) {
          const adoptPetsWithFirstImage = (result.searchAdoptPets || []).map(
            (pet) => ({
              ...pet,
              pet_image:
                pet.pet_image && pet.pet_image.length > 0
                  ? pet.pet_image[0]
                  : null,
            })
          );

          const combinedResults = [
            ...(result.searchSuccessStories || []),
            ...adoptPetsWithFirstImage,
          ];

          setResults(combinedResults);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
        setResults([]);
      }
    };

    if (searchQuery) {
      fetchSearchResults();
    }
  }, [searchQuery]);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="results-container">
        {results.length > 0 ? (
          results.map((item, index) => (
            <div
              key={index}
              className="result-box flex bg-white p-4 rounded-lg shadow-md">
              <div className="image-column w-1/3">
                {item.petPhotoUrl && (
                  <img
                    src={item.petPhotoUrl}
                    alt={item.petName}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
                {item.pet_image && (
                  <img
                    src={item.pet_image}
                    alt={item.pet_name}
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
              <div className="text-column w-2/3 pl-4">
                <h2 className="text-xl font-bold">
                  {item.petName || item.pet_name}
                </h2>
                {item.pet_age && (
                  <p className="text-sm font-bold">Age: {item.pet_age} yrs</p>
                )}
                {item.pet_gender && (
                  <p className="text-sm font-bold">Gender: {item.pet_gender}</p>
                )}
                {item.description && <p>{item.description}</p>}
              </div>
            </div>
          ))
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
