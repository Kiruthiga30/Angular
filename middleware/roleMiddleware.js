const { STATUS_CODES, MESSAGES } = require("../utils/constants");

const roleMiddleware = (role) => {
  return (req, res, next) => {
    if (req.user.role === role || req.user.role === "admin") {
      next();
    } else {
      res.status(STATUS_CODES.UNAUTHORIZED).json(MESSAGES.UNAUTHORIZED_ACCESS);
    }
  };
};

module.exports = roleMiddleware;
