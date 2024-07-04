const { STATUS_CODES, MESSAGES } = require("../utils/constants");

module.exports = (role) => {
  return (req, res, next) => {
    if (!role.includes(req.user.user.role)) {
      return res.status(STATUS_CODES.DENIED).json(MESSAGES.ACCESS_DENIED);
    }
    next();
  };
};
