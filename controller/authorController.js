const author = require("../model/author");
const { STATUS_CODES, MESSAGES } = require("../utils/constants");

//create author
exports.createAuthor = async (req, res) => {
  try {
    let newAuthor = new author(req.body);
    newAuthor = await newAuthor.save();
    res.status(STATUS_CODES.CREATED).json(newAuthor);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//read author
exports.getAuthor = async (req, res) => {
  try {
    const authors = await author.find();
    if (!authors) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(authors);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//update author by id
exports.updateById = async (req, res) => {
  try {
    const updateAuthorById = await author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateAuthorById) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(updateAuthorById);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//delete author by id
exports.deleteById = async (req, res) => {
  try {
    const deleteAuthorById = await author.findByIdAndDelete(req.params.id);
    if (!deleteAuthorById) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(MESSAGES.BOOK_REMOVED);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
