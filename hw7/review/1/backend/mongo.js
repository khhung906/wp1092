// import mongoose from 'mongoose';
const mongoose = require('mongoose');



function connectMongo() {
  // Yen added it!
  // gotta load in MONGO_URL before `mongo.connect()`
  require('dotenv-defaults').config();

  if (!process.env.MONGO_URL) {
    console.error("Missing Mongo_URL!!!");
    process.exit(1);
  }

  // i use mongodb://localhost:27017/cardmongo for MONGO_URL
  mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function () {
    console.log('Mongo database connected!');
  });
}

const mongo = {
  connect: connectMongo,
};

module.exports = mongo;
