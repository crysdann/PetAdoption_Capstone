import React from "react";
import PropTypes from "prop-types";

const ItemCard = ({ item }) => {
  console.log(`item: ${JSON.stringify(item)}`);
  if (!item) {
    return null;
  }

  const isAdoptPet = item.pet_name !== undefined;
  console.log(`isAdoptPet: ${isAdoptPet}`);
  console.log(`pet_name: ${item.pet_name}`);

  return (
    <div className="item-card">
      {/* Conditionally render image if available */}
      {isAdoptPet && item.pet_image && (
        <img src={item.pet_image} alt={item.pet_name} className="item-image" />
      )}
      {!isAdoptPet && item.petPhotoUrl && (
        <img src={item.petPhotoUrl} alt={item.petName} className="item-image" />
      )}
      <h2 className="item-name">{isAdoptPet ? item.pet_name : item.petName}</h2>
      <p className="item-description">
        {isAdoptPet ? item.pet_description : item.description}
      </p>
      {isAdoptPet && (
        <div className="pet-details">
          <p>Type: {item.pet_type}</p>
          <p>Age: {item.pet_age} years</p>
          <p>Gender: {item.pet_gender}</p>
          <p>Breed: {item.pet_breed}</p>
        </div>
      )}
    </div>
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string,
    _id: PropTypes.string,
    petName: PropTypes.string,
    pet_name: PropTypes.string,
    description: PropTypes.string,
    pet_description: PropTypes.string,
    petPhotoUrl: PropTypes.string,
    pet_image: PropTypes.string,
    pet_type: PropTypes.string,
    pet_age: PropTypes.number,
    pet_gender: PropTypes.string,
    pet_breed: PropTypes.string,
  }).isRequired,
};

export default ItemCard;
