const { Router } = require("express");
const adminRouter = Router();
const { AdminModel, CourseModel } = require("../db.js");
const jwt = require("jsonwebtoken");
const { JWT_ADMIN_PASSWORD } = require("../config.js");
const { adminMiddleware } = require("../middleware/admin.js");
adminRouter.post("/signup", async function (req, res) {
  const { email, password, firstName, lastName } = req.body; //Todo zod validationss

  await AdminModel.create({
    email: email,
    password: password,
    firstName: firstName,
    lastName: lastName,
  });
  res.json({
    message: "Sign Up succeeded",
  });
});
adminRouter.post("/login", function (req, res) {
  const { email, password } = req.body;
  const admin = AdminModel.findOne({
    email: email,
    password: password,
  });
  if (admin) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
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
adminRouter.post("/course", async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price } = req.body;

  const course = await CourseModel.create({
    title: title,
    description: description,
    imageUrl: imageUrl,
    price: price,
    creatorId: adminId,
  });
  res.json({
    message: "Course created",
    courseId: course._id,
  });
});
adminRouter.put("/", adminMiddleware, async function (req, res) {
  const adminId = req.userId;
  const { title, description, imageUrl, price, courseId } = req.body;

  const course = await CourseModel.updateOne(
    {
      _id: courseId,
      creatorId: adminId,
    },
    {
      title: title,
      description: description,
      imageUrl: imageUrl,
      price: price,
    }
  );
  res.json({
    message: "Course updated",
    courseId: course._id,
  });
});
adminRouter.get("/course/bulk", function (req, res) {});

module.exports = {
  adminRouter: adminRouter,
};
