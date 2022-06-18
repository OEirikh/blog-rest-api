const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors'); // кросдоменні запроси
const morgan = require('morgan'); // logger
const {connectMongo} = require('./src/db/connection');
const {router} = require('./src/routers/postsRouter');

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', router);
app.use(cors);
app.use((error, req, res, next) => {
  res.status(500).json({message: error.message});
});

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.log('Error at anver launch:', err);
      }
      console.log(`serverExpres works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`failed to launch application with error${error.message}`);
  }
};

start();
