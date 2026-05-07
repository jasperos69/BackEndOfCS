require("dotenv").config();

const express = require("express");

const app = express();
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const JWT_SECRET = "JaiiHoo";
const { courseRouter } = require("./routes/course.js");
const { userRouter } = require("./routes/user.js");
const { adminRouter } = require("./routes/admin.js");

app.use(express.json());

app.use("/user", userRouter);
app.use("/course", courseRouter);
app.use("/admin", adminRouter);
app.post("/admin/login", function (req, res) {});
app.post("/admin/signup", function (req, res) {});
app.post("/admin/createCourses", function (req, res) {});
app.post("/admin/deleteCourses", function (req, res) {});
app.post("/admin/addCourseContent", function (req, res) {});

async function main() {
  console.log("in the main");
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Logged In");
  app.listen(3000);
}
main();
