const MongoClient = require('mongodb').MongoClient;
const MONGO_URL = process.env.MONGO_URL;
const collections = {};
getCollections = () => collections;

const connectMongo = async () => {
  const client = await MongoClient.connect(MONGO_URL, {
    useNewUrlParser: true,
  });

  const db = client.db('GOIT');

  collections.Posts = db.collection('posts');
  console.log('database connected successfully!');
};

module.exports = {
  connectMongo,
  getCollections,
};
