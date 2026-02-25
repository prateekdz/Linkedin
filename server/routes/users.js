const express = require('express');
const auth = require('../middleware/auth');
const {
  getCurrentUser,
  getUserProfile,
  updateProfile,
  addConnection,
} = require('../controllers/userController');

const router = express.Router();

router.get('/me', auth, getCurrentUser);
router.get('/:id', getUserProfile);
router.put('/me', auth, updateProfile);
router.post('/:userId/connect', auth, addConnection);

module.exports = router;
