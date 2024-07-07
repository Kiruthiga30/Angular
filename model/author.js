const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid"); //autogenerate id
const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  authorId: { type: String, default: uuidv4, unique: true },
  name: { type: String, required: true },
  bio: { type: String, required: true },
});

module.exports = mongoose.model("Author", AuthorSchema);
