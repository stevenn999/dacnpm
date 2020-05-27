const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const userModel = require("../models/user.model");
router.post("/register", async (req, res) => {
  const entity = req.body;
  const userExist = await userModel.findOneUserName(entity.userName);
  if (!userExist) {
    let ret = await userModel.addUser(entity);
    res.json(`Thêm tài khoản ${entity.userName} thành công`);
  } else {
    res.json(`Tài khoản ${userExist.userName} đã tồn tại`);
  }
});
router.post("/login", async (req, res) => {
  const entity = req.body;
  const ret = await userModel.userLogin(entity);
  if (ret === null)
    return res.json({ failLogin: "Tài khoản hoặc mật khẩu chưa chính xác" });
  const payload = {
    idUser: ret._id,
    userName: ret.userName,
    fullName: ret.fullName,
  };

  const token = jwt.sign(payload, "secretKey", {
    expiresIn: "10d", // 10 day
  });
  res.json({ token: token });
});

module.exports = router;
