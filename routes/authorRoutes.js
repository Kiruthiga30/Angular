const express = require("express");
const auth = require("../middleware/userMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createAuthor,
  getAuthor,
  updateById,
  deleteById,
} = require("../controller/authorController");

const router = express.Router();

//create
router.post("/create", auth, role(["admin"]), createAuthor);

//read
router.get("/read", auth, getAuthor);

//update by id
router.put("/update/:id", auth, role(["admin"]), updateById);

//delete by id
router.delete("/delete/:id", auth, role(["admin"]), deleteById);

module.exports = router;
