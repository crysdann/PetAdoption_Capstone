const { getDb } = require("./db");

///creating new pet record
async function addLostPet(_, { input }) {
    try {
        const db = getDb();
        //insert pet data
        const lostPet = await db.collection("lostPets").insertOne(input);
        console.log("Report data inserted successfully", lostPet.insertedId);

        const insertedPet = await db
            .collection("lostPets")
            .findOne({ _id: lostPet.insertedId });
        return insertedPet;
    } catch (err) {
        console.error("Error in data insert:", err);
    }
}

async function uploadImg(_, { img }) {
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
const getLostPets = async () => {
    try {
        const db = getDb();
        const lostPets = await db.collection("lostPets").find({}).toArray();

        if (lostPets.length === 0) {
            console.log("No lostPets found in the database.");
            return [];
        }

        // Map over each pet to fetch its associated images as an array of strings
        const petsWithImages = await Promise.all(lostPets.map(async (pet) => {
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



//export modules
module.exports = {
    addLostPet, uploadImg, getLostPets
};
