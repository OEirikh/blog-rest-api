const express = require('express');
const router = new express.Router();
const {addPosstValidation} = require('../middlewares/validationMiddlewares');

const {ctrlWrapper} = require('../middlewares/ctrlWrapper');
const {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require('../controllers/postsControllerr');

router
  // GET /api/posts => [...posts]
  .get('/', ctrlWrapper(getPostsController))
  // GET /api/posts/<123> => {post with <123>}
  .get('/:id', ctrlWrapper(getPostByIdController))
  // POST /api/posts => [newPost, ...posts]
  .post('/', ctrlWrapper(addPostController), addPosstValidation)
  // PUT /api/posts/<123> => [change post with id:123, ...posts]
  .put('/:id', ctrlWrapper(changePostController), addPosstValidation)
  // DELETE /api/posts/<123> => [delete post with id:123, ...posts]
  .delete('/:id', ctrlWrapper(deletePostController));

module.exports = {router};
