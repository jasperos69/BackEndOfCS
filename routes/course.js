const { Router } = require("express");

const courseRouter = Router();

courseRouter.post("/course/purchase", function (req, res) {});
courseRouter.post("/course/preview", function (req, res) {});

module.exports = { courseRouter: courseRouter };
