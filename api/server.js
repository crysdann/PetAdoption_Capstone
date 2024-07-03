const express = require("express");
const { installHandler } = require('./api_handler');
const { connectToDb } = require('./db');
require('dotenv').config();

const app = express();
installHandler(app);

const { SERVER_PORT } = process.env;
// create new async function to start the application and initialization database client
async function startApp() {
  try {
    //connect to database
    db = await connectToDb();

    app.listen(SERVER_PORT, function () {
      console.log(`API server started on port ${SERVER_PORT}`);
    });
  } catch (error) {
    console.log("Error starting the application", error);
  }
}

startApp();
