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
        }
      `;

      const variables = { searchQuery };

      try {
        const result = await graphQLFetch(searchQueryText, variables);
        if (result && result.searchSuccessStories) {
          setResults(result.searchSuccessStories);
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
      <div className="results-grid">
        {results.map((item) => (
          <Items currentItems={results} />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
