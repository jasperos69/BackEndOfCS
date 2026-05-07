const mongoose = require("mongoose");

// const { default: courseRouter } = require("./routes/course.js");
// const { default: userRouter } = require("./routes/user.js");

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const User = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  courseId: ObjectId,
});

const Admin = new Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const Course = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creatorId: ObjectId,
});

const Purchase = new Schema({
  userId: ObjectId,
  courseId: ObjectId,
});

const UserModel = mongoose.model("user", User);
const AdminModel = mongoose.model("admin", Admin);
const CourseModel = mongoose.model("course", Course);
const PurchaseModel = mongoose.model("purchase", Purchase);

module.exports = {
  UserModel,
  AdminModel,
  CourseModel,
  PurchaseModel,
};
