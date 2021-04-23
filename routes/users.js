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

//Getting One
router.get("/:id", (req, res) => {
  res.send(req.params.id);
});

//Updating One

//Deleting One

module.exports = router;
