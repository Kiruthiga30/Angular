require("dotenv").config();
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { STATUS_CODES, MESSAGES } = require("../utils/constants");

//register a new user
exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  //filter out undefined inputs
  if (!username | !email | !password | !role) {
    return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.PROVIDE_DETAILS);
  }
  try {
    //check if user already exist
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(MESSAGES.USER_ALREADY_EXISTS);
    }
    //create new user
    user = new User({
      username,
      email,
      password,
      role,
    });
    //hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(STATUS_CODES.CREATED).json(MESSAGES.REGISTER_SUCCESS);
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};

//login user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  //check for undefined inputs
  if (!email | !password) {
    return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.PROVIDE_DETAILS);
  }
  try {
    let user = await User.findOne({ email });
    //check if the user found or not
    if (!user) {
      return res.status(STATUS_CODES.NOT_FOUND).json(MESSAGES.USER_NOT_FOUND);
    }
    const matchUser = await bcrypt.compare(password, user.password);
    if (!matchUser) {
      return res
        .status(STATUS_CODES.BAD_REQUEST)
        .json(MESSAGES.INVALID_CREDENTIALS);
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    //return the token
    res.status(STATUS_CODES.CREATED).json({ token, roles: user.role });
  } catch (err) {
    console.error(err.message);
    res.status(STATUS_CODES.INTERNAL_SERVER_ERROR).json(MESSAGES.SERVER_ERROR);
  }
};
