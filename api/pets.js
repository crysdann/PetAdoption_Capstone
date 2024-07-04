const { getDb, getCurrentPetCount } = require("./db");

///creating new pet record
async function createPet(_, { pet}) {
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


//export modules
module.exports = {
  createPet,insertImg
};
