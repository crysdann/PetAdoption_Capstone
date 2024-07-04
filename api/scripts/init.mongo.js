const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb+srv://aleenajoshy112:fullStack%402022@cluster0.39im0eo.mongodb.net/petconnect?retryWrites=true';

// Database Name
const dbName = 'petconnect';

// Sample users data
const users = [
  {
    user_id: 1,
    first_name: 'John',
    last_name: 'Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    password: 'password123'
    },
  {
    user_id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    email: 'jane.doe@example.com',
    phone: '0987654321',
    password: 'password456', 
  },
];

const count = users.length;

async function initializeDatabase() {
  const client = new MongoClient(url);

  try {
    await client.connect();

    const db = client.db(dbName);

    // Remove existing users
    await db.collection('users').deleteMany({});

    // Insert sample users data
    await db.collection('users').insertMany(users);

    // Create indexes
    await db.collection('users').createIndex({ user_id: 1 }, { unique: true });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('users').createIndex({ phone: 1 });

    // Optionally create a counters collection for managing user_id sequence
    await db.collection('usercounter').deleteOne({ _id: 'users' });
    await db.collection('usercounter').insertOne({ _id: 'users', current: count });

    console.log('Initialization complete.');
  } catch (err) {
    console.error('Initialization error:', err);
  } finally {
    await client.close();
  }
}

// Call the initialization function
initializeDatabase();
