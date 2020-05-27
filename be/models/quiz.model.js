const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const quizSchema = new mongoose.Schema({
  idUser: String,
  nameQuiz: String,
  quiz: Array,
  imgQuiz: String,
});

const quizModel = mongoose.model("quizModel", quizSchema, "quizs");

const showQuiz = async (idQuiz) => {
  let quiz = await quizModel.findOne(idQuiz);
  return quiz;
};
const showQuizByIdUser = async (idUser) => {
  let quiz = await quizModel.find(idUser);
  return quiz;
};
const addQuiz = async (entity) => {
  await quizModel.create(entity);
};
const updateQuiz = async (id,entity) => {
  await quizModel.findByIdAndUpdate(id,entity)
};
const removeQuiz = async (id,entity) => {
  await quizModel.findByIdAndRemove(id,entity)
};
module.exports = {
  showQuiz,
  addQuiz,
  updateQuiz,
  removeQuiz,
  showQuizByIdUser
};
