const { getDb,getCurrentUserCount } = require("./db");

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
    }catch (err) {
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
  

  //export modules
module.exports = {
    createUser, loginUser
  };