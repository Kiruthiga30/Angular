const { STATUS_CODES, MESSAGES } = require("../utils/constants");
const book = require("../model/book");

//create
exports.createBook = async (req, res) => {
  try {
    let newBook = new book(req.body);
    newBook = await newBook.save();
    res.status(STATUS_CODES.CREATED).json(newBook);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//get all books
exports.getAllBooks = async (req, res) => {
  try {
    const books = await book.find();
    if (!books) {
      console.log(books);
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(books);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//update by id
exports.updateBookById = async (req, res, next) => {
  try {
    const updateBook = await book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updateBook) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(updateBook);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//delete by id
exports.deleteBookById = async (req, res, next) => {
  try {
    const deleteBook = await book.findByIdAndDelete(req.params.id);
    if (!deleteBook) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(MESSAGES.BOOK_REMOVED);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
