const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authGoogle=require("../middleware/authGoogle")
const authFacebook=require("../middleware/authFacebook")

const registerModel = require("../models/register.model");
const loginModel = require("../models/login.model");

router.get("/login", (req, res) => {
  res.send("Login");
});

router.post("/login", async (req, res) => {
  const user = req.body;
  const ret = await loginModel.login(user);
  if (ret === null)
    return res.json({ failLogin: "Tài khoản hoặc mật khẩu chưa chính xác" });
  const payload = {
    idAccount: ret.idAccount,
    userName: ret.userName,
    fullName: ret.fullName,
  };

  const token = jwt.sign(payload, "secretKey", {
    expiresIn: "10d", // 10 day
  });
  res.json({ token: token });
  //token
});

router.get("/register", (req, res) => {
  res.send("Register");
});

router.post("/register", async (req, res) => {
  const newAccount = req.body;
  const accountExist = await registerModel.findOneUserName(newAccount.userName);
  if (accountExist.length === 0) {
    const result = await registerModel.register(newAccount);
    res.json(`Thêm tài khoản ${newAccount.userName} thành công`);
  } else {
    res.json(`Tài khoản ${newAccount.userName} đã tồn tại`);
  }
});

router.post("/verify", (req, res) => {
  const token = req.body.token;
  if (token) {
    jwt.verify(token, "secretKey", function (err, payload) {
      if (err) res.send(false);
      else res.send(true);
    });
  } else res.send(false);
});

router.post("/auth/google", authGoogle,async (req, res) => {
  let user = req.body.user;
  user.passWord = "secretKey";
  const accountExist = await registerModel.findOneUserName(user.userName);
  if (accountExist.length === 0) {
    await registerModel.register(user);
  }

  const token = jwt.sign(user, "secretKey", {
    expiresIn: "10d", // 10 day
  });

  res.json({ token: token });
});

router.post("/auth/facebook", authFacebook,async (req, res) => {
  let user = req.body.user;
  user.passWord = "secretKey";
  const accountExist = await registerModel.findOneUserName(user.userName);
  if (accountExist.length === 0) {
    await registerModel.register(user);
  }

  const token = jwt.sign(user, "secretKey", {
    expiresIn: "10d", // 10 day
  });
  res.json({ token: token });

});
module.exports = router;
