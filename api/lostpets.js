const { getDb } = require("./db");
const { ObjectId } = require("mongodb");

// Function to add a new lost pet record
async function addLostPet(_, { input }) {
    try {
        const db = getDb();
        // Insert pet data
        const lostPet = await db.collection("lostPets").insertOne(input);
        console.log("Report data inserted successfully", lostPet.insertedId);

        // Fetch and return the inserted pet record
        const insertedPet = await db.collection("lostPets").findOne({ _id: lostPet.insertedId });
        return insertedPet;
    } catch (err) {
        console.error("Error in data insert:", err);
        throw err;
    }
}

// Function to insert a new pet image
async function insertPetImg(_, { img }) {
    try {
        const db = getDb();
        // Insert image data into MongoDB
        const newImg = await db.collection("images").insertOne(img);
        console.log("Image inserted successfully:", newImg.insertedId);

        // Fetch and return the inserted image record
        const insertedImage = await db.collection("images").findOne({ _id: newImg.insertedId });
        return insertedImage;
    } catch (err) {
        console.error("Error inserting image:", err);
        throw err;
    }
}

// Function to get all lost pets, including images
const getLostPets = async () => {
    try {
        const db = getDb();
        const lostPets = await db.collection("lostPets").find({}).toArray();

        if (lostPets.length === 0) {
            console.log("No lostPets found in the database.");
            return [];
        }

        // Map over each pet to fetch its associated images
        const petsWithImages = await Promise.all(lostPets.map(async (pet) => {
            const petId = pet._id.toString(); // Convert ObjectId to string
            console.log("Processing petId:", petId);

            // Fetch images associated with the petId
            const images = await db.collection("images").find({ petId }).toArray();
            console.log("Fetched images for petId", petId, images);

            const imageUrls = images.map(image => image.url);
            console.log("Image URLs for petId", petId, imageUrls.length);

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
const getLostPetsByUser = async (_, { user_id }) => {
    try {
        const db = getDb();
        // Query lost pets by user_id
        const lostPets = await db.collection("lostPets").find({ user_id }).toArray();

        if (lostPets.length === 0) {
            console.log("No lostPets found for the given user_id.");
            return [];
        }

        // Map over each pet to fetch its associated images
        const petsWithImages = await Promise.all(lostPets.map(async (pet) => {
            const petId = pet._id.toString(); // Convert ObjectId to string
            console.log("Processing petId:", petId);

            // Fetch images associated with the petId
            const images = await db.collection("images").find({ petId }).toArray();
            console.log("Fetched images for petId", petId, images);

            const imageUrls = images.map(image => image.url);
            console.log("Image URLs for petId", petId, imageUrls.length);

            return {
                ...pet,
                pet_image: imageUrls,
            };
        }));

        return petsWithImages;
    } catch (err) {
        console.error("Error fetching pets by user_id:", err);
        throw err;
    }
};

// Function to get details of a lost pet using ID
const getLostPetDetails = async (_, { petId }) => {
    try {
        const db = getDb();
        console.log(petId);

        const petIdObjectId = new ObjectId(petId); // Convert to ObjectId if needed
        const lostpetDetail = await db.collection("lostPets").findOne({ _id: petIdObjectId });
        console.log(lostpetDetail);

        if (!lostpetDetail) {
            console.log("No lost pet found with the given ID.");
            return null;
        }

        // Fetch images associated with the petId
        const images = await db.collection("images").find({ petId }).toArray();

        const imageUrls = images.map(image => image.url);

        const petWithImages = {
            ...lostpetDetail,
            pet_image: imageUrls,
        };

        return petWithImages;
    } catch (err) {
        console.error("Error in getLostPetDetails():", err);
        throw err;
    }
};

// Function to update lost pet details
const updateLostPet = async (_, { id, input }) => {
    try {
        console.log("inside update");
        const db = getDb();
        const petIdObjectId = new ObjectId(id); // Convert to ObjectId

        if (petIdObjectId) {
            // Update the lost pet record
            await db.collection("lostPets").updateOne({ _id: petIdObjectId }, { $set: input });
            // Fetch the updated pet details
            const updatedPet = await db.collection("lostPets").findOne({ _id: petIdObjectId });
            return updatedPet;
        }
    } catch (err) {
        console.error("Error in updateLostPet():", err);
        throw err;
    }
};

// Function to delete a lost pet record by ID
async function deleteLostPet(_, { id }) {
    try {
        const db = getDb();
        // Delete pet data from the lostPets collection
        const result = await db.collection("lostPets").deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            console.log("No lostPet found with the given ID.");
            return false;
        }

        console.log("Lost pet deleted successfully:", id);
        return true;
    } catch (err) {
        console.error("Error deleting lost pet:", err);
        throw err;
    }
}

// Export modules
module.exports = {
    addLostPet,
    insertPetImg,
    getLostPets,
    getLostPetsByUser,
    getLostPetDetails,
    updateLostPet,
    deleteLostPet
};
