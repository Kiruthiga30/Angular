const mongoose = require("mongoose");
//authorschema
const authorSchema = new mongoose.Schema({
  authorname: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Author", authorSchema);
