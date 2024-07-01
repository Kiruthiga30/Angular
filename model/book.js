const mongoose = require("mongoose");
//bookschema
const bookSchema = new mongoose.Schema({
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
