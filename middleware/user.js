const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config.js");

function userMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_USER_PASSWORD);
  if (decodedData) {
    req._id = decodedData.id;
    next();
  } else {
    res.status(403).json("user not found");
  }
}

module.exports = {
  userMiddleware: userMiddleware,
};
