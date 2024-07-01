require("dotenv").config();
const jwt = require("jsonwebtoken");
const { STATUS_CODES, MESSAGES } = require("../utils/constants");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(STATUS_CODES.UNAUTHORIZED).json(MESSAGES.NO_TOKEN);
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(STATUS_CODES.UNAUTHORIZED).json(MESSAGES.INVALID_TOKEN);
  }
};
