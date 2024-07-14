const express = require("express");
const { registerUser, loginUser } = require("../controller/userController");

const router = express.Router();

const roles = ["admin", "bookmanager", "authormanager"];

// Get all roles
router.get("/roles", (_req, res) => {
  res.json(roles);
});

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
