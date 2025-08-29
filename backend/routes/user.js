const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const usersSchema = require('../schemas/userSchema');

const User = mongoose.model('users', usersSchema);

router.post('/login', async (req, res) => {
  let success = false;
  const user = await User.find({ email: req.body.email });
  if (user[0] && user[0].password === req.body.password) {
    success = true;
    res.json({ success, user: user[0] });
  }
  else res.json({ success, message: "Invalid credentials" });
});

router.post('/signup', async (req, res) => {
  const user = await User.find({ email: req.body.email });
  if (user[0]) return res.json({ success: false, message: "User already exists" });
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ success: true, newUser });
});

router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;