const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getAllBooks,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controller/bookController");

//create a new book ("admin" & "bookmanager")
router.post("/create", authMiddleware, createBook);

//get all books ("admin" & "bookmanager")
router.get("/read", authMiddleware, getAllBooks);

//update a book by ID ("admin" & "bookmanager")
router.put("/update/:id", authMiddleware, updateBookById);

// DELETE a book by ID ("admin" & "bookmanager")
router.delete("/delete/:id", authMiddleware, deleteBookById);

module.exports = router;
