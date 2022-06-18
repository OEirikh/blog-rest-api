const express = require('express');
const router = new express.Router();
const {addPosstValidation} = require('../middlewares/validationMiddlewares');

const modelsMiddleware = require('../middlewares/models');
const {ctrlWrapper} = require('../middlewares/ctrlWrapper');
const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  deletePost,
} = require('../controllers/postsControllerr');
router.use(modelsMiddleware);
router
// GET /api/posts => [...posts]
    .get('/', ctrlWrapper(getPosts))
// GET /api/posts/<123> => {post with <123>}
    .get('/:id', ctrlWrapper(getPostById))
// POST /api/posts => [newPost, ...posts]
    .post('/', ctrlWrapper(addPost), addPosstValidation)
// PUT /api/posts/<123> => [change post with id:123, ...posts]
    .put('/:id', ctrlWrapper(changePost), addPosstValidation)
// DELETE /api/posts/<123> => [delete post with id:123, ...posts]
    .delete('/:id', ctrlWrapper(deletePost));

module.exports = {router};
