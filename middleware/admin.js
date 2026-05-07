const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");

function adminMiddleware(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_ADMIN_PASSWORD);
  if (decodedData) {
    req.userId = decodedData._id;
    next();
  } else {
    res.status(403).json("user not found");
  }
}

module.exports = {
  adminMiddleware: adminMiddleware,
};
