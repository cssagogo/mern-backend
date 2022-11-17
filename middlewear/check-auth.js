require("dotenv").config();
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");

module.exports = (req, res, next) => {
  // Handle browser default behavior 
  if (req.method === 'OPTIONS') {
    return next();
  }

  // Standard handling of token
  try {
    const token = req.headers.authorization.split(" ")[1]; //Authorization: 'Bearer TOKEN'
    if (!token) {
      throw new Error("Authentication failed!");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    req.userData = {
      userId: decodedToken.userId,
    };
    next();
  } catch (err) {
    return next(new HttpError("Authentication failed!", 403));
  }
};
