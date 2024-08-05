import React from "react";
import PropTypes from "prop-types";
import ItemCard from "./ItemCard";

const Items = ({ currentItems }) => {
  if (currentItems.length === 0) {
    return <p>No results found.</p>;
  }

  return (
    <div className="items-grid">
      {currentItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

Items.propTypes = {
  currentItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      petName: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      petPhotoUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Items;
