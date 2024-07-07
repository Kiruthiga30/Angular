const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getAllBooks,
  createBook,
  updateBookById,
  deleteBookById,
} = require("../controller/bookController");

//create a new book ("admin" & "book admin")
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "book admin"]),
  createBook
);

//get all books ("admin" & "book admin")
router.get("/read", authMiddleware, getAllBooks);

//update a book by ID ("admin" & "book admin")
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin", "book admin"]),
  updateBookById
);

// DELETE a book by ID ("admin" & "book admin")
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin", "book admin"]),
  deleteBookById
);

module.exports = router;
