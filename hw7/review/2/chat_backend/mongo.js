const mongoose = require('mongoose');
//import mongoose from 'mongoose';
const dotenv =require ('dotenv-defaults');

// i use mongodb://localhost:27017/cardmongo for MONGO_URL
dotenv.config();

function connectMongo() {
  mongoose.connect(process.env.MONGO_URL, {
  //mongoose.connect('mongodb+srv://sam:sam861128@chatbox.iz5un.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {
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
