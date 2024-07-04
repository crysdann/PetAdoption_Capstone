const { getDb, getCurrentPetCount } = require("./db");

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

//export modules
module.exports = {
    addLostPet
};
