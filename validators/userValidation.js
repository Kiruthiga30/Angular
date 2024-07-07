const Joi = require("@hapi/joi");

const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).alphanum().trim().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please provide a valid email address.",
    }),
  password: Joi.string()
    .pattern(
      new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})")
    )
    .required()
    .trim()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    }),
  role: Joi.string().valid("admin", "bookAdmin", "authorAdmin").required(),
});

module.exports = userSchema;
