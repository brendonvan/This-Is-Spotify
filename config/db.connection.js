// In db.connection.js

const mongoose = require('mongoose');

//environment loading .env file into process.env object
require('dotenv').config();

// console.log(process.env.MONGODB_URI)

// get the MongoDB URL from .env file
const connectionStr = process.env.MONGODB_URI;

mongoose.connect(connectionStr);

mongoose.connection.on('connected', () => {
  console.log(`[${new Date().toLocaleTimeString()}] - MongoDB connected ... 🙌 🙌 🙌`); 
});

mongoose.connection.on('error', (error) => {
  console.log('MongoDB connection error 😥', error);
});

mongoose.connection.on('disconnected', () => console.log('MongoDB disconnected  ⚡️ 🔌 ⚡️'));

const db = require("../models/");
const seedData = require("../models/seed_data/");

// NEEDED FOR SEED DATA POPULATING
// db.Playlist.insertMany(seedData.seed_playlist, (err, db) => {
//     if (err) {
//         console.log(err)
//     }
//       console.log("added models data", db)
//       mongoose.connection.close();
// });