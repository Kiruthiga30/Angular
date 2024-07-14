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
exports.getAllAuthors = async (_req, res) => {
  try {
    const authors = await author.find({ isActive: true });
    console.log(authors);
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
exports.updateAuthorById = async (req, res) => {
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
exports.deleteAuthorById = async (req, res) => {
  try {
    const authorId = req.params.id;
    const deleteAuthor = await author.findByIdAndUpdate(
      authorId,
      { isActive: false },
      { new: true }
    );
    if (!deleteAuthor) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.AUTHOR_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(deleteAuthor);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
