const { getDb, getCurrentPetCount } = require("./db");

//creating new pet record
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

//export modules
module.exports = {
  createPet,
};
