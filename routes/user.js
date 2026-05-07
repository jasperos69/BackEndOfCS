const { Router } = require("express");
const { UserModel } = require("../db.js");
const jwt = require("jsonwebtoken");
const { JWT_USER_PASSWORD } = require("../config.js");
const userRouter = Router();
const { userMiddleware } = require("../middleware/user.js");

userRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; //Todo zod validationss
  console.log("enter here");
  const user = await UserModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    console.log("in db exirst");
    res.json({
      msg: "already exist",
    });
  } else {
    await UserModel.create({
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
    });
    res.json({
      message: "Sign Up succeeded",
    });
  }
});
userRouter.post("/login", function (req, res) {
  const { email, password } = req.body;
  const user = UserModel.findOne({
    email: email,
    password: password,
  });
  if (user) {
    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_USER_PASSWORD
    );
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});
userRouter.get("/purchases", function (req, res) {});

module.exports = { userRouter: userRouter };
