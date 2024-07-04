const { getDb } = require("./db");

// Creating a new success story record
async function createSuccessStory(_, { petName, description }) {
  try {
    const db = getDb();

    // createSuccessStory.id = await getCurrentPetCount("successStories");
    // createPet.id = await getCurrentPetCount("pets");

    // Insert success story data
    const newSuccessStory = await db.collection("successStories").insertOne({
      petName,
      description,
    });

    console.log(
      "Success story inserted successfully",
      newSuccessStory.insertedId
    );

    const insertedSuccessStory = await db
      .collection("successStories")
      .findOne({ _id: newSuccessStory.insertedId });

    return insertedSuccessStory;
  } catch (err) {
    console.error("Error in success story insert:", err);
    throw err; // Throw the error to be caught by the GraphQL resolver
  }
}

// Export modules
module.exports = {
  createSuccessStory,
};
