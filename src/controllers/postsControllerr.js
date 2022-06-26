const {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
} = require('../services/postsService');

const getPostsController = async (req, res) => {
  const userId = req.user._id;
  const posts = await getPosts(userId);
  res.json({posts, status: 'success'});
};

const getPostByIdController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const post = await getPostsById(postId, userId);
  res.json({post, status: 'success'});
};

const addPostController = async (req, res) => {
  const {topic, text} = req.body;
  const userId = req.user._id;
  await addPost({topic, text, userId});
  res.json({status: 'success'});
};

const changePostController = async (req, res) => {
  const {topic, text} = req.body;
  const postId = req.params.id;
  const userId = req.user._id;
  await changePostById(postId, {topic, text, userId});
  res.json({status: 'success'});
};

const deletePostController = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  await deletePostById(postId, userId);
  res.json({status: 'success'});
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
