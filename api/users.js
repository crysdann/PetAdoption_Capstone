const { getDb, getCurrentUserCount } = require("./db");
const { ObjectId } = require('mongodb');


async function createUser(_, { user }) {
  try {
    const db = getDb();
    // Insert user into collection
    const result = await db.collection('users').insertOne(user);
    console.log("User data inserted successfully", result.insertedId);

    // Get the inserted user using the ID and return
    const savedUser = await db.collection('users').findOne(result.insertedId);
    console.log('Saved user', savedUser);
    return savedUser;
  } catch (err) {
    console.error("Error in data insert:", err);
  }
}


async function loginUser(_, { email, password }) {
  try {
    const db = getDb();

    // Query the database to find the user by email and password
    const user = await db.collection('users').findOne({ email, password });

    if (!user) {
      throw new Error('Invalid credentials. Please check your email and password.');
    }
    console.log('User logged in successfully:', user);
    return user;
  } catch (err) {
    console.error('Error logging in:', err);
    throw err;
  }
}

async function getUserDetails(_, { _id }) {
  try {
    const db = getDb();

    // Ensure _id is converted to ObjectId type
    const userId = new ObjectId(_id);

    // Query the database to find the user by _id
    const user = await db.collection('users').findOne({ _id: userId });

    if (!user) {
      throw new Error('User not found.');
    }

    console.log('User details retrieved successfully:', user);
    return user;
  } catch (err) {
    console.error('Error retrieving user details:', err);
    throw err;
  }
}

// New function for updating user details
async function updateUserDetails(_, { _id, first_name, last_name, email, phone, password }) {
  try {
    const db = getDb();
    const userId = new ObjectId(_id);

    // Update user details in the database
    const result = await db.collection('users').findOneAndUpdate(
      { _id: userId },
      { $set: { first_name, last_name, email, phone, password } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
      throw new Error('User not found.');
    }

    console.log('User details updated successfully:', result.value);
    return result.value;
  } catch (err) {
    console.error('Error updating user details:', err);
    throw err;
  }
}

//export modules
module.exports = {
  createUser, loginUser, getUserDetails, updateUserDetails,
};