const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); //autogenerate id
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookId: { type: String, default: uuidv4, unique: true },
  title: { type: String, required: true },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Author",
    required: true,
  },
  journal: { type: String, required: true },
  publishedDate: { type: Date, required: true },
});

module.exports = mongoose.model("Book", BookSchema);
