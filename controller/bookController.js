const { STATUS_CODES, MESSAGES } = require("../utils/constants");
const book = require("../model/book");
const moment = require("moment");

//create
exports.createBook = async (req, res) => {
  try {
    const { title, authorId, journal, publishedDate } = req.body;
    const newBook = new book({
      title,
      authorId,
      journal,
      publishedDate: moment(publishedDate).toDate(),
    });
    const Book = await newBook.save();
    res.status(STATUS_CODES.CREATED).json(Book);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//get all books
exports.getAllBooks = async (_req, res) => {
  try {
    const books = await book.find({ isActive: true });
    const formattedBooks = books.map((book) => ({
      ...book._doc,
      publishedDate: moment(book.publishedDate).format("YYYY-MM-DD"),
    }));
    if (!books) {
      console.log(books);
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(formattedBooks);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//update by id
exports.updateBookById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const trimId = id.trim();
    const updateBook = await book.findByIdAndUpdate(trimId, req.body, {
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
exports.deleteBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const books = await book.findByIdAndUpdate(
      bookId,
      { isActive: false },
      { new: true }
    );
    if (!books) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(books);
  } catch (err) {
    console.error("jhhh", err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
