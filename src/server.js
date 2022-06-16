const express = require('express');
const {MongoClient} = require('mongodb');
const app = express();
// const cors = require('cors'); // кросдоменні запроси
const morgan = require('morgan'); // logger

const {router} = require('./routers/postsRouter');

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', router);

const start = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
  });

  const db = client.db();
  const Posts = db.collection('posts');
  const posts = await Posts.find({}).toArray();

  console.log('posts :', posts);

  app.listen(PORT, err => {
    if (err) {
      console.log('Error at anver launch:', err);
    }
    console.log(`serverExpres works at port ${PORT}`);
  });
};

module.exports = {
  start,
};
