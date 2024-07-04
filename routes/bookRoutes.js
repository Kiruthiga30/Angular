const express = require("express");
const auth = require("../middleware/userMiddleware");
const role = require("../middleware/roleMiddleware");
const {
  createBook,
  getBookById,
  getBookBytitle,
  updateById,
  updateByTitle,
  deleteById,
  deleteByTitle,
  getBook,
} = require("../controller/bookController");
const router = express.Router();

//create book
router.post("/create", auth, role(["admin"]), createBook);

//get all books
router.get("/read", auth, getBook);

//update by id
router.put("/update/:id", auth, role(["admin"]), updateById);

//delete by id
router.delete("/delete/:id", auth, role(["admin"]), deleteById);

/*//get by authorid
//router.get("/read/:authorId",auth,getBookById);

//get by title
router.get("/read/:title",auth,getBookBytitle);

//update by title
router.put("/:title",role(["admin"]),auth,updateByTitle);

//delete by title
router.delete("/:title",auth,role(["admin"]),deleteByTitle);*/

module.exports = router;
