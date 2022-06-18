const {Post} = require('../db/postModel');

const getPostsController = async (req, res) => {
  const posts = await Post.find();
  res.json({posts, status: 'success'});
};

const getPostByIdController = async (req, res) => {
  const {id} = req.params;
  const post = await Post.findById(id);

  if (!post) {
    res.status(400).json({message: `no post with id ${id}`});
  }
  res.json({post, status: 'success'});
};

const addPostController = async (req, res) => {
  const {topic, text} = req.body;
  const post = new Post({topic, text});

  await post.save();
  res.json({status: 'success'});
};

const changePostController = async (req, res) => {
  const {topic, text} = req.body;
  const {id} = req.params;
  await Post.findByIdAndUpdate(id, {$set: {topic, text}});
  // $set - дозволяє міняти тільки ті поля які передаються
  res.json({status: 'success'});
};

const deletePostController = async (req, res) => {
  const {id} = req.params;
  await Post.findByIdAndDelete(id);
  res.json({status: 'success'});
};

module.exports = {
  getPostsController,
  getPostByIdController,
  addPostController,
  changePostController,
  deletePostController,
};
