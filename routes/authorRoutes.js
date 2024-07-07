const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getAllAuthors,
  createAuthor,
  updateAuthorById,
  deleteAuthorById,
} = require("../controller/authorController");

//create a new author ("admin" & "author admin")
router.post(
  "/create",
  authMiddleware,
  roleMiddleware(["admin", "author admin"]),
  createAuthor
);

//get all authors ("admin" & "author admin")
router.get("/read", authMiddleware, getAllAuthors);

//update a author by ID ("admin" & "author admin")
router.put(
  "/update/:id",
  authMiddleware,
  roleMiddleware(["admin", "author admin"]),
  updateAuthorById
);

// delete a book by ID ("admin" & "author admin")
router.delete(
  "/delete/:id",
  authMiddleware,
  roleMiddleware(["admin", "author admin"]),
  deleteAuthorById
);

module.exports = router;
