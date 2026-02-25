const User = require('../models/User');

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const getUserProfile = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id)
      .select('-password')
      .populate('connections', 'firstName lastName avatar headline');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { headline, location, about, avatar } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.headline = headline || user.headline;
    user.location = location || user.location;
    user.about = about || user.about;
    user.avatar = avatar || user.avatar;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

const addConnection = async (req, res, next) => {
  try {
    const { userId: targetUserId } = req.params;

    if (req.userId === targetUserId) {
      return res.status(400).json({ message: 'Cannot connect with yourself' });
    }

    const user = await User.findById(req.userId);
    const targetUser = await User.findById(targetUserId);

    if (!user || !targetUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.connections.includes(targetUserId)) {
      user.connections.pull(targetUserId);
      targetUser.connections.pull(req.userId);
    } else {
      user.connections.push(targetUserId);
      targetUser.connections.push(req.userId);
    }

    await user.save();
    await targetUser.save();

    res.json({ message: 'Connection status updated', user: user.toJSON() });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentUser,
  getUserProfile,
  updateProfile,
  addConnection,
};
