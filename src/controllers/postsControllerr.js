let posts = [
  {id: '1', topic: 'test', text: 'test text'},
  {id: '2', topic: 'tes2', text: 'tes2 text'},
  {id: '3', topic: 'tes3', text: 'test tex3'},
];

const getPosts = (req, res) => {
  res.json({posts, status: 'success'});
};

const getPostById = (req, res) => {
  const {id} = req.params;

  const [post] = posts.filter((item) => item.id === id);
  if (!post) {
    res.status(400).json({message: `no post with id ${id}`});
  }
  res.json({post, status: 'success'});
};

const addPost = (req, res) => {
  const {topic, text} = req.body;
  posts.push({
    id: new Date().getTime().toString(),
    topic,
    text,
  });

  res.json({status: 'success'});
};

const changePost = (req, res) => {
  const {topic, text} = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({status: 'success'});
};

const patchPost = (req, res) => {
  const {topic, text} = req.body;
  posts.forEach((post) => {
    if (post.id === req.params.id) {
      if (topic) {
        post.topic = topic;
      }
      if (text) {
        post.text = text;
      }
    }
  });
  res.json({status: 'success'});
};

const deletePost = (req, res) => {
  posts = posts.filter((item) => item.id !== req.params.id);
  res.json({status: 'success'});
};

module.exports = {
  getPosts,
  getPostById,
  addPost,
  changePost,
  patchPost,
  deletePost,
};
