import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import graphQLFetch from "../graphQLFetch";
import Items from "../components/Items";
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

      console.log("GraphQL Query:", searchQueryText);
      console.log(`Search query: ${searchQuery}`);
      const variables = { searchQuery };

      try {
        const result = await graphQLFetch(searchQueryText, variables);
        console.log("GraphQL result:", result);

        if (result) {
          const combinedResults = [
            ...(result.searchSuccessStories || []),
            ...(result.searchAdoptPets || []),
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
  console.log("Results passed to Items:", results);

  return (
    <div>
      <h1>Search Results for "{searchQuery}"</h1>
      <div className="results-grid">
        {results.length > 0 ? (
          <Items currentItems={results} />
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
