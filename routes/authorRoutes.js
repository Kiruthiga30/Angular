const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllAuthors,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
} = require("../controller/authorController");

//create a new author ("admin" & "authormanager")
router.post("/create", authMiddleware, createAuthor);

//get all authors ("admin" & "authormanager")
router.get("/read", authMiddleware, getAllAuthors);

//update a author by ID ("admin" & "authormanager")
router.put("/update/:id", authMiddleware, updateAuthorById);

// delete a book by ID ("admin" & "authormanager")
router.delete("/delete/:id", authMiddleware, deleteAuthorById);

module.exports = router;
