const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const quizModel = require("../models/quiz.model");

router.get("/show/:_id", async (req, res) => {
  var id = req.params;
  const quiz = await quizModel.showQuiz(id);
  res.json(quiz);
});
router.get("/shows/:idUser", async (req, res) => {
  var id = req.params;
  const quiz = await quizModel.showQuizByIdUser(id);
  res.json(quiz);
});

router.post("/add", async (req, res) => {
  const quiz = req.body;

  try {
    await quizModel.addQuiz(quiz);
    res.json("Thêm quiz thành công");
  } catch (e) {
    console.log("ERROR: " + e);
  }
});

router.post("/update/:_id", async (req, res) => {
  const id = req.params;
  const quiz = req.body;

  try {
    await quizModel.updateQuiz(id, quiz);
    res.json("Sửa quiz thành công");
  } catch (e) {
    console.log("ERROR: " + e);
  }
});

router.post("/remove/:_id", async (req, res) => {
  const id = req.params;
  const quiz = req.body;

  try {
    await quizModel.removeQuiz(id, quiz);
    res.json("Xóa quiz thành công");
  } catch (e) {
    console.log("ERROR: " + e);
  }
});

module.exports = router;
