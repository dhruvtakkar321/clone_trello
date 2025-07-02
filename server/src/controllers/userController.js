
const User=require('../models/user')

// GET /user
const getUser = async (req, res) => {
  try {
    let user = await User.findOne();
    if (!user) {
      user = await User.create({ name: 'Admin', role: 'admin' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// PUT /user
const updateUser = async (req, res) => {
  try {
    const { name } = req.body;
    const user = await User.findOne();
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (name) user.name = name;
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

module.exports = {
  getUser,
  updateUser,
};
