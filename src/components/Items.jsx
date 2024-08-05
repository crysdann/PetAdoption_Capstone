import React from "react";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard";

const Items = ({ currentItems }) => {
  console.log(`currentItems: ${currentItems}`);
  if (currentItems.length === 0) {
    return <p>No results found.</p>;
  }

  const filteredItems = currentItems.filter((item) => item !== null);
  console.log(`Filtered items: ${JSON.stringify(filteredItems)}`);

  return (
    <div className="items-grid">
      {currentItems.map((item, index) =>
        item ? <ItemCard key={item._id || index} item={item} /> : null
      )}
    </div>
  );
};

Items.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      _id: PropTypes.string,
      petName: PropTypes.string,
      pet_name: PropTypes.string,
      description: PropTypes.string,
      pet_description: PropTypes.string,
      petPhotoUrl: PropTypes.string,
      pet_image: PropTypes.string,
    })
  ).isRequired,
};

export default Items;
