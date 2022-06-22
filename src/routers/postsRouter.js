const express = require('express');
const router = new express.Router();
const {addPosstValidation} = require('../middlewares/validationMiddlewares');
const {ctrlWrapper} = require('../helpers/apiHelpers');
const {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
} = require('../controllers/postsControllerr');

// GET /api/posts => [...posts]
router.get('/', ctrlWrapper(getPostsController));
// GET /api/posts/<123> => {post with <123>}
router.get('/:id', ctrlWrapper(getPostByIdController));
// POST /api/posts => [newPost, ...posts]
router.post('/', addPosstValidation, ctrlWrapper(addPostController));
// PUT /api/posts/<123> => [change post with id:123, ...posts]
router.put('/:id', addPosstValidation, ctrlWrapper(changePostController));
// DELETE /api/posts/<123> => [delete post with id:123, ...posts]
router.delete('/:id', ctrlWrapper(deletePostController));

module.exports = {postsRouter: router};
