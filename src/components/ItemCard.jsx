import React from "react";
import PropTypes from "prop-types";

const ItemCard = ({ item }) => {
  return (
    <div className="item-card">
      <img src={item.petPhotoUrl} alt={item.petName} className="item-image" />
      <h2 className="item-name">{item.petName}</h2>
      <p className="item-description">{item.description}</p>
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    petName: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    petPhotoUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ItemCard;
