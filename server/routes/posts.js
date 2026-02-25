const express = require('express');
const auth = require('../middleware/auth');
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  addComment,
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);

module.exports = router;
