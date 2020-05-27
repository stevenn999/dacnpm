const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: String,
  fullName: String,
  email: String,
  passWord: String,
});

const userModel = mongoose.model("userModel", userSchema, "users");

const addUser = async (entity) => {
  try {
    const hash = bcrypt.hashSync(entity.passWord, 8);
    entity.passWord = hash;
    var user = new userModel(entity);
    await user.save();
  } catch (e) {
    console.log("ERROR: " + e);
  }
};
const findOneUserName = async (userName) => {
  try {
    let user = await userModel.findOne({ userName: userName });
    return user;
  } catch (e) {
    console.log("ERROR: " + e);
  }
};
const userLogin = async (entity) => {
  const userExist = await userModel.findOne({ userName: entity.userName });
  if (userExist === null) return null;
  const passWord = userExist.passWord;
  if (bcrypt.compareSync(entity.passWord, passWord)) {
    return userExist;
  }
  return null;
};
module.exports = {
  addUser,
  findOneUserName,
  userLogin,
};
