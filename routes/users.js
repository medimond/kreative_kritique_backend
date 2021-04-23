const express = require("express");
const router = express.Router();
const User = require("../models/user");

//Getting all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Creating One
router.post("/", async (req, res) => {
  const user = new User({
    name: req.body.name,
    password: req.body.password,
    displayName: req.body.displayName,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//log a use in
router.post("/login", async (req, res) => {
  try {
    user = await User.find(
      await User.findOne({ name: req.body.name, password: req.body.password })
    );
    res.status(200).json(user[0]);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
//Getting One by ID
router.get("/:id", getUser, (req, res) => {
  res.status(200).json(res.user);
});

//Updating One
router.get("/:id", (req, res) => {});

//Deleting One
router.get("/:id", (req, res) => {});

async function getUser(req, res, next) {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

module.exports = router;
