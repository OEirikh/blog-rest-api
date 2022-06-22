const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors'); // кросдоменні запроси
const morgan = require('morgan'); // logger
// eslint-disable-next-line max-len
const {connectMongo} = require('./src/db/connection'); // підключення до MongoDB через mongoose
const {postsRouter} = require('./src/routers/postsRouter');
const {authRouter} = require('./src/routers/authRooter');

const {errorHandler} = require('./src/helpers/apiHelpers');

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());

app.use('/api/posts', postsRouter);
app.use('/api/auth', authRouter);

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, (err) => {
      if (err) {
        console.log('Error at ansver launch:', err);
      }
      console.log(`serverExpres works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`failed to launch application with error${error.message}`);
  }
};

start();
