const express = require('express');
const app = express();
// const cors = require('cors'); // кросдоменні запроси
const morgan = require('morgan'); // logger
const {connectMongo} = require('./db/connection');
const {router} = require('./routers/postsRouter');

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', router);

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

module.exports = {
  start,
};
