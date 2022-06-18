const mongoose = require('mongoose');
const MONGO_URL = process.env.MONGO_URL;
// mongoose.Promise = global.Promise;

const connectMongo = async () => {
  await mongoose.connect(MONGO_URL, {dbName: 'GOIT'});
  console.log('database connected successfully!');
};

module.exports = {
  connectMongo,
};
