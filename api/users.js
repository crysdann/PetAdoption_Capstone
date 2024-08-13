const { getDb } = require("./db");
const { ObjectId } = require('mongodb');
const bcrypt = require('bcrypt');

async function createUser(_, { user }) {
  try {
    const db = getDb();

    console.log("create user");
    // Check if a user with the same email already exists
    const existingUser = await db.collection('users').findOne({ email: user.email });
    if (existingUser) {
      throw new Error('User with this email already exists.');
    }

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

    // Query the database to find the user by email
    const user = await db.collection('users').findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials. Please check your email and password.Email not found');
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials. Please check your email and password. Password not matching');
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
    return user;
  } catch (err) {
    console.error('Error retrieving user details:', err);
    throw err;
  }
}

const updateAdminDetails = async (_, { admin }) => {
  const db = getDb();

  console.log("updateAdmin called");

  // Convert admin._id to ObjectId
  const adminId = new ObjectId(admin._id);

  // Perform the update operation using findOneAndUpdate
  const updatedAdmin = await db.collection('users').findOneAndUpdate(
    { _id: adminId }, // Filter by _id
    {
      $set: {
        first_name: admin.first_name,
        last_name: admin.last_name,
        email: admin.email,
        phone: admin.phone
      }
    },
    { returnOriginal: false } // Return the updated document instead of the original
  );

  if (!updatedAdmin.value) {
    console.error("Admin not found");
    throw new Error("Admin not found");
  }

  return {
    _id: updatedAdmin.value._id,
    first_name: updatedAdmin.value.first_name,
    last_name: updatedAdmin.value.last_name,
    email: updatedAdmin.value.email,
    phone: updatedAdmin.value.phone,
    userType: updatedAdmin.value.userType 
  };
}

async function updateAdminPassword(_, { input }) {
  const { userId, oldPassword, newPassword } = input;
  try {
    console.log("change psw called");
    const db = getDb();
    const userObjectId = new ObjectId(userId);
    console.log("change psw called");
    console.log("chenge",userId);
    const user = await db.collection('users').findOne({ _id: userObjectId });
    if (!user) {
      throw new Error('User not found.');
    }

    const isPasswordCorrect = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordCorrect) {
      throw new Error('Incorrect old password.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    const result = await db.collection('users').updateOne(
      { _id: userObjectId },
      { $set: { password: hashedNewPassword } }
    );

    if (result.modifiedCount === 0) {
      throw new Error('Failed to change password.');
    }

    return true
    } catch (err) {
    console.error('Error changing password:', err);
    throw err;
  }
}

//export modules
module.exports = {
  createUser, loginUser, getUserDetails, updateAdminDetails,updateAdminPassword
};