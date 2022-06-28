const express = require('express');
const router = new express.Router();
const multer = require('multer');
const path = require('path');
const {ctrlWrapper} = require('../helpers/apiHelpers');
const {uploadController} = require('../controllers/filesControllers');
const {v4: uuidv4} = require('uuid');
const FILE_DIR = path.resolve('./tmp');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FILE_DIR);
  },

  filename: function (req, file, cb) {
    const [filename, extentions] = file.originalname.split('.');
    cb(null, `${uuidv4()}.${extentions}`);
  },
});
const uploadMiddleware = multer({storage: storage});

// POST api/files/upload
// content-type: multipart/form-data

router
  .post(
    '/upload',
    uploadMiddleware.single('avatar'),
    ctrlWrapper(uploadController),
  )
  .use('/download', express.static(FILE_DIR));

module.exports = {filesRouter: router};
