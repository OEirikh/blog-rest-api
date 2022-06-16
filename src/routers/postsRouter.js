const express = require('express');
const router = new express.Router();
const {
  addPosstValidation,
  changePostValidation,
} = require('../middlewares/validationMiddlewares');

const {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
} = require('../controllers/postsControllerr');
router
// GET /api/posts => [...posts]
    .get('/', getPosts)
// GET /api/posts/<123> => {post with <123>}
    .get('/:id', getPostById)
// POST /api/posts => [newPost, ...posts]
    .post('/', addPost, addPosstValidation)
// PUT /api/posts/<123> => [change post with id:123, ...posts]
    .put('/:id', changePost, addPosstValidation)
// PATCH /api/posts/<123> => [change post with id:123, ...posts]
    .patch('/:id', patchPost, changePostValidation)
// DELETE /api/posts/<123> => [delete post with id:123, ...posts]
    .delete('/:id', deletePost);

module.exports = {router};
