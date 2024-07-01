const book = require("../model/book");
const { STATUS_CODES, MESSAGES } = require("../utils/constants");

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

//read all books
exports.getBook = async (req, res) => {
  try {
    const books = await book.find();
    if (!books) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(books);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//update by id
exports.updateById = async (req, res) => {
  try {
    const updateBookById = await book.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    if (!updateBookById) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(updateBookById);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//delete by id
exports.deleteById = async (req, res) => {
  try {
    const deleteBookById = await book.findByIdAndDelete(req.params.id);
    if (!deleteBookById) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
    }
    res.status(STATUS_CODES.OK).json(MESSAGES.BOOK_REMOVED);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

/*//read by authorid
exports.getById=async(req,res)=>{
    try{
        const bookId=new book.find({authorId:req.params.authorId});
        if(!bookId){
            return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
        }
        res.status(STATUS_CODES.OK).json(bookId);
    }catch(err){
        console.error(err.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
    }
}
//read by bookname
exports.getBytitle=async(req,res)=>{
    try{
        const bookTitle=new book.find({title:req.params.title});
        if(!bookTitle){
            return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
        }
        res.status(STATUS_CODES.OK).json(bookTitle);
    }catch(err){
        console.error(err.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
    }
}

//update by title
exports.updateByTitle=async(req,res)=>{
    try{
        const updateBookByTitle=await book.updateOne(
            {title:req.params.title},
            req.body,
            {
                new:true,
            }
        );
        if(!updateBookByTitle){
            return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND);
        }
        const updatedBook=await book.find({title:req.params.title});
        res.status(STATUS_CODES.OK).json(updatedBook);
    }catch(err){
        console.error(err.message);
        res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
    }
}
//delete by title
exports.deleteByTitle=async(req,res)=>{
    try{
    const deleteBookByTitle=new book.deleteOne({title});
    if(!deleteBookByTitle){
        return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.BOOK_NOT_FOUND)
    }
    res.status(STATUS_CODES.OK).json(MESSAGES.BOOK_REMOVED);
}catch(err){
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
}
}
*/
