const Joi = require("@hapi/joi");

const authorSchema = Joi.object({
  name: Joi.string().min(3).max(30).alphanum().trim().required(),
  authorId: Joi.string().required().unique(),
  bio: Joi.string().alphanum().trim().required(),
});

module.exports = authorSchema;
