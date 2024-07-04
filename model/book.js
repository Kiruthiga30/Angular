const mongoose = require("mongoose");
//bookschema
const bookSchema = new mongoose.Schema({
  bookid:{
    type:Number,
    required:true
  },
  title: {
    type: String,
    required: true,
  },
  authorId: {
    type: Number,
    required: true,
    unique: true,
  },
  publishedDate: {
    type: Date,
  },
});
module.exports = mongoose.model("Book", bookSchema);
