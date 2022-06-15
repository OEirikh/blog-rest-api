const express = require('express');
const app = express();
// const cors = require('cors'); // кросдоменні запроси
const morgan = require('morgan'); // logger

const {router} = require('./routers/postsRouter');

const PORT = process.env.PORT || 8090;

app.use(express.json());
app.use(morgan('tiny'));
app.use('/api/posts', router);

const server = app.listen(PORT, (err) => {
  if (err) {
    console.log('Error at anver launch:', err);
  }
  console.log(`serverExpres works at port ${PORT}`);
});

module.exports = {
  server,
};
