const { ObjectId } = require("mongodb");
const { getDb } = require("./db");

async function createSuccessStory(_, { petName, description, petPhotoUrl }) {
  try {
    const db = getDb();
    const newSuccessStory = await db.collection("successStories").insertOne({
      petName,
      description,
      petPhotoUrl,
    });

    console.log(
      "Success story inserted successfully",
      newSuccessStory.insertedId
    );

    const insertedSuccessStory = await db.collection("successStories").findOne({
      _id: newSuccessStory.insertedId,
    });

    // Transform MongoDB _id to GraphQL id
    insertedSuccessStory.id = insertedSuccessStory._id.toString();
    delete insertedSuccessStory._id;

    return insertedSuccessStory;
  } catch (err) {
    console.error("Error in success story insert:", err);
    throw err;
  }
}

module.exports = {
  createSuccessStory,
};
