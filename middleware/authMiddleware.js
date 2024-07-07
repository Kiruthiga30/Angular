require("dotenv").config();
const jwt = require("jsonwebtoken");
const { STATUS_CODES, MESSAGES } = require("../utils/constants");
const User = require("../model/user");

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });
    if (!user) {
      return res.status(STATUS_CODES.UNAUTHORIZED).json(MESSAGES.NO_TOKEN);
    }
    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(STATUS_CODES.UNAUTHORIZED).json(MESSAGES.INVALID_TOKEN);
  }
};

module.exports = authMiddleware;
