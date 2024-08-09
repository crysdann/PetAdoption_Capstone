const { ObjectId } = require("mongodb");
const { getDb } = require("./db");

async function createSuccessStory(_, { input }) {
  try {
    const { user_id, petName, description, petPhotoUrl } = input;
    const db = getDb();
    const newSuccessStory = await db.collection("successStories").insertOne({
      user_id: ObjectId(user_id),
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

// Fetch all success stories function
const getSuccessStories = async () => {
  try {
    const db = getDb();
    console.log("Connecting to the database...");

    const successStories = await db
      .collection("successStories")
      .find({})
      .toArray();

    console.log("Fetched success stories:", successStories);
    console.log("Number of success stories fetched:", successStories.length);

    if (successStories.length === 0) {
      console.log("No success stories found in the database.");
      return [];
    }

    // Transform _id to id for each success story
    const successStoriesWithId = successStories.map((story) => {
      story.id = story._id.toString();
      delete story._id;
      return story;
    });

    return successStoriesWithId;
  } catch (err) {
    console.error("Error fetching success stories:", err);
    throw err;
  }
};
// Function to fetch success stories by user ID
const getSuccessStoriesByUser = async (_, { user_id }) => {
  try {
    const db = getDb();
    console.log("Connecting to the database...");

    const successStories = await db
      .collection("successStories")
      .find({ user_id: ObjectId(user_id) })
      .toArray();

    console.log("Fetched success stories by user:", successStories);
    console.log("Number of success stories fetched:", successStories.length);

    if (successStories.length === 0) {
      console.log("No success stories found for the user.");
      return [];
    }

    // Transform _id to id for each success story
    const successStoriesWithId = successStories.map((story) => {
      story.id = story._id.toString();
      delete story._id;
      return story;
    });

    return successStoriesWithId;
  } catch (err) {
    console.error("Error fetching success stories by user:", err);
    throw err;
  }
};

const searchSuccessStories = async (_, { searchQuery }) => {
  try {
    const db = getDb();
    console.log("Connecting to the database...");

    const searchRegex = new RegExp(searchQuery, "i");

    const successStories = await db
      .collection("successStories")
      .find({
        $or: [{ petName: searchRegex }, { description: searchRegex }],
      })
      .toArray();

    console.log("Fetched success stories by search:", successStories);
    console.log("Number of success stories fetched:", successStories.length);

    if (successStories.length === 0) {
      console.log("No success stories found for the search query.");
      return [];
    }

    // Transform _id to id for each success story
    const successStoriesWithId = successStories.map((story) => {
      story.id = story._id.toString();
      delete story._id;
      return story;
    });

    return successStoriesWithId;
  } catch (err) {
    console.error("Error fetching success stories by search:", err);
    throw err;
  }
};

const searchAdoptPets = async (_, { searchQuery }) => {
  console.log("searchAdoptPets function called");
  try {
    const db = getDb();
    console.log("Connecting to the database...");

    const searchRegex = new RegExp(searchQuery, "i");

    const adoptPets = await db
      .collection("pets")
      .find({
        $or: [{ pet_type: searchRegex }, { pet_name: searchRegex }],
      })
      .toArray();

    console.log("Fetched adopt pets by search:", adoptPets);
    console.log("Number of adopt pets fetched:", adoptPets.length);

    if (adoptPets.length === 0) {
      console.log("No adopt pets found for the search query.");
      return [];
    }

    // Transform _id to id for each adopt pet
    const adoptPetsWithId = adoptPets
      .map((pet) => {
        if (!pet._id) {
          console.error("Found a pet with missing _id:", pet);
          return null;
        }
        pet.id = pet._id.toString();
        delete pet._id;
        return pet;
      })
      .filter(Boolean);

    return adoptPetsWithId;
  } catch (err) {
    console.error("Error fetching adopt pets by search:", err);
    throw err;
  }
};

async function deleteSuccessStory(_, { id }) {
  try {
    const db = getDb();
    const result = await db.collection("successStories").deleteOne({
      _id: ObjectId(id),
    });

    console.log("Delete result:", result);

    if (result.deletedCount === 1) {
      return true;
    } else {
      console.log("No success story found with the provided ID.");
      return false;
    }
  } catch (err) {
    console.error("Error deleting success story:", err);
    throw err;
  }
};
// Export modules
module.exports = {
  createSuccessStory,
  getSuccessStories,
  getSuccessStoriesByUser,
  searchSuccessStories,
  searchAdoptPets,
  deleteSuccessStory,
};
