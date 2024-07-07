const Joi = require("@hapi/joi");

const bookSchema = Joi.object({
  bookId: Joi.string().trim().unique().required(),
  title: Joi.string().alphanum().trim().required(),
  authorId: Joi.string().trim().required(),
  journal: Joi.string().alphanum().trim().required(),
  publishedDate: Joi.date().trim().required(),
});

module.exports = bookSchema;
