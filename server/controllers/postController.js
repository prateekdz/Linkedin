const Post = require('../models/Post');
const User = require('../models/User');

const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('author', 'firstName lastName avatar headline')
      .populate('likes', 'firstName lastName')
      .populate('comments.user', 'firstName lastName avatar')
      .sort({ createdAt: -1 })
      .exec();

    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const createPost = async (req, res, next) => {
  try {
    const { content, image } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({ message: 'Post content cannot be empty' });
    }

    const post = new Post({
      author: req.userId,
      content,
      image: image || null,
    });

    await post.save();
    await post.populate('author', 'firstName lastName avatar headline');

    res.status(201).json({
      message: 'Post created successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content, image } = req.body;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.content = content || post.content;
    post.image = image !== undefined ? image : post.image;
    await post.save();

    res.json({
      message: 'Post updated successfully',
      post,
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(id);

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.likes.indexOf(req.userId);
    if (userIndex > -1) {
      post.likes.splice(userIndex, 1);
    } else {
      post.likes.push(req.userId);
    }

    await post.save();
    await post.populate('likes', 'firstName lastName');

    res.json({ message: 'Post liked/unliked successfully', post });
  } catch (error) {
    next(error);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body;

    if (!text || text.trim().length === 0) {
      return res.status(400).json({ message: 'Comment cannot be empty' });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    post.comments.push({
      user: req.userId,
      text,
    });

    await post.save();
    await post.populate('comments.user', 'firstName lastName avatar');

    res.json({ message: 'Comment added successfully', post });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
};
