const express = require("express");
const { installHandler } = require('./api_handler');
const { connectToDb } = require('./db');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors
require('dotenv').config();

const app = express();

// Use CORS middleware to allow requests from different origins
app.use(cors({
  origin: 'https://petconnectcapstone-1cf29.web.app' // client’s URL
}));

app.use(bodyParser.json());

installHandler(app);

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // email service
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL, // email address
    pass: process.env.PASSWORD, // email password 
  },
  tls: {
    rejectUnauthorized: true
  }
});

// Endpoint to send email
app.post('/api/send-email', async (req, res) => {
  const { to, subject, html } = req.body;

  const mailOptions = {
    from: process.env.EMAIL,
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

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
