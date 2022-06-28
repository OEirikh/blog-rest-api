const {Post} = require('../db/postModel');
const {WrongParametrsError} = require('../helpers/errors');

const getPosts = async (userId, {skip, limit}) => {
  const posts = await Post.find({userId})
    .select({__v: 0})
    .skip(skip)
    .limit(limit);
  return posts;
};
const getPostsById = async (postId, userId) => {
  const post = await Post.findOne({_id: postId, userId});

  if (!post) {
    throw new WrongParametrsError(`no post with id ${postId}`);
  }

  return post;
};
const addPost = async ({topic, text, userId}) => {
  const post = new Post({topic, text, userId});

  await post.save();
};
const changePostById = async (postId, {topic, text, userId}) => {
  await Post.findOneAndUpdate({_id: postId, userId}, {$set: {topic, text}});
  // $set - дозволяє міняти тільки ті поля які передаються
};
const deletePostById = async (postId, userId) => {
  await Post.findOneAndDelete({_id: postId, userId});
};

module.exports = {
  getPosts,
  getPostsById,
  addPost,
  changePostById,
  deletePostById,
};
