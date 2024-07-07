const { STATUS_CODES, MESSAGES } = require("../utils/constants");
const author = require("../model/author");

//create
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

//get all authors
exports.getAllAuthors = async (req, res) => {
  try {
    const authors = await author.find();
    if (!authors) {
      console.log(authors);
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.AUTHOR_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(authors);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//update by id
exports.updateAuthorById = async (req, res, next) => {
  try {
    const updateAuthor = await author.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateAuthor) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.AUTHOR_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(updateAuthor);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//delete by id
exports.deleteAuthorById = async (req, res, next) => {
  try {
    const deleteAuthor = await author.findByIdAndDelete(req.params.id);
    if (!deleteAuthor) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.AUTHOR_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(MESSAGES.AUTHOR_REMOVED);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
