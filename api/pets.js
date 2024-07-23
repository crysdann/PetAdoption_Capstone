const { getDb, getCurrentPetCount } = require("./db");
const { ObjectId } = require("mongodb");


///creating new pet record
async function createPet(_, { pet }) {
  try {
    const db = getDb();
    //get the current pet count from counters
    createPet.id = await getCurrentPetCount("pets");
    //insert pet data
    const newPet = await db.collection("pets").insertOne(pet);
    console.log("Pet data inserted successfully", newPet.insertedId);

    const insertedPet = await db
      .collection("pets")
      .findOne({ _id: newPet.insertedId });
    return insertedPet;
  } catch (err) {
    console.error("Error in data insert:", err);
  }
}

async function insertImg(_, { img }) {
  try {
    const db = getDb();
    // Insert image data into MongoDB
    const newImg = await db.collection("images").insertOne(img);
    console.log("Image inserted successfully:", newImg.insertedId);

    // Retrieve the inserted image from MongoDB
    const insertedImage = await db.collection("images").findOne({ _id: newImg.insertedId });
    return insertedImage;
  } catch (err) {
    console.error("Error inserting image:", err);
    throw err; // Throw the error to be caught by GraphQL
  }
}
const getAllPets = async () => {
  try {
    const db = getDb();
    const pets = await db.collection("pets").find({}).toArray();

    if (pets.length === 0) {
      console.log("No pets found in the database.");
      return [];
    }

    // Map over each pet to fetch its associated images as an array of strings
    const petsWithImages = await Promise.all(pets.map(async (pet) => {
      const petId = pet._id.toString(); // Convert ObjectId to string
      console.log("Processing petId:", petId);

      // Fetch images associated with the petId as a string
      const images = await db.collection("images").find({ petId }).toArray();
      console.log("Fetched images for petId", petId, images); // Detailed debug log

      const imageUrls = images.map(image => image.url);
      console.log("Image URLs for petId", petId, imageUrls.length); // Detailed debug log

      return {
        ...pet,
        pet_image: imageUrls,
      };
    }));

    return petsWithImages;
  } catch (err) {
    console.error("Error fetching pets with images:", err);
    throw err;
  }
};

// Function to get lost pets by user ID
const getAllPetsByUser = async (_, { user_id }) => {
  try {
    const db = getDb();
    // Query lost pets by user_id
    const pets = await db.collection("pets").find({ user_id }).toArray();

    if (pets.length === 0) {
      console.log("No pets found for the given user_id.");
      return [];
    }

    // Map over each pet to fetch its associated images as an array of strings
    const petsWithImages = await Promise.all(pets.map(async (pet) => {
      const petId = pet._id.toString(); // Convert ObjectId to string
      console.log("Processing petId:", petId);

      // Fetch images associated with the petId as a string
      const images = await db.collection("images").find({ petId }).toArray();
      console.log("Fetched images for petId", petId, images); // Detailed debug log

      const imageUrls = images.map(image => image.url);
      console.log("Image URLs for petId", petId, imageUrls.length); // Detailed debug log

      return {
        ...pet,
        pet_image: imageUrls,
      };
    }));

    return petsWithImages;
  } catch (err) {
    console.error("Error fetching pets with images:", err);
    throw err;
  }
};

//get details of a pet using id
async function getPetDetails(_, { petId }) {
  try {
    const db = getDb();
    console.log(petId);

    const petIdObjectId = new ObjectId(petId); // Convert to ObjectId if needed
    const pet_detail = await db
      .collection("pets")
      .findOne({ _id: petIdObjectId });
      console.log(pet_detail);

    if (!pet_detail) {
      console.log("No pets found in the database.");
      return null;
    }

    // Fetch images associated with the petId as a string
    const images = await db.collection("images").find({ petId }).toArray();

    const imageUrls = images.map((image) => image.url);

    const petWithImages = {
      ...pet_detail,
      pet_image: imageUrls,
    };

    return petWithImages;
  } catch (err) {
    console.error("Error in getPetDetails():", err);
  }
}

//export modules
module.exports = {
  createPet, insertImg, getAllPets, getAllPetsByUser, getPetDetails
};
