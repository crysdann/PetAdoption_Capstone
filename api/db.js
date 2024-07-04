const { MongoClient } = require("mongodb");
require("dotenv").config();

// Add Connection URL
const { DB_URL } = process.env;
// Database Name
const { DB_NAME } = process.env;
//create global database object
let db;

// create aysnc function to connect to database
async function connectToDb() {
  try {
    //Create client
    const client = new MongoClient(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    //Connect to the client (await)
    await client.connect();
    //Return connection client.db
    db = client.db(DB_NAME);
  } catch (err) {
    console.error("Database connection error:", err);
  }
}

//function updating counter
async function getCurrentPetCount(name) {
  const result = await db
    .collection("counters")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  return result.value.current;
}

//function updating user counter
async function getCurrentUserCount(name) {
  const result = await db
    .collection("usercounter")
    .findOneAndUpdate(
      { _id: name },
      { $inc: { current: 1 } },
      { returnOriginal: false }
    );
  return result.value.current;
}

//function for getting db object
function getDb() {
  return db;
}
//export modules
module.exports = { connectToDb, getCurrentPetCount, getCurrentUserCount, getDb };
