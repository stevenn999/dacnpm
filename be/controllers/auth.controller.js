const db = require("../models");
const config = require("../config/auth.config");
const Account = db.account;
const LocalCredential = db.localCredential;
const Op = db.Sequelize.Op;
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const generateId = require('../utils/generateId');
exports.signup = async (req, res) => {
  // Save Account to Database
  try{
    // await LocalCredential.create({
    //   email: req.body.email,
    //   password: bcrypt.hashSync(req.body.password, 8),
    //   account:{
    //     username: req.body.username
    //   }
    // }, {include: [Account]});

    await Account.create({
      id: generateId(),
      username: req.body.username,
      localCredential: {
        id: generateId(),
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
      }
    }, {include: [LocalCredential]});
    res.send({ message: "Account registered successfully!" });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

exports.signin = async (req, res) => {
  try{
    const account = await Account.findOne({
      where: {
        username: req.body.username
      }
    });

    if (!account) {
      return res.status(404).send({ message: "Account Not found." });
    }

    const credential = await LocalCredential.findOne({
      where: {
        id: account.localCredentialId
      }
    });

    if (!credential) {
      return res.status(404).send({ message: "Account Not found." });
    }

    var passwordIsValid = bcrypt.compareSync(
      req.body.password,
      credential.password
    );
  
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!"
      });
    }
  
    var token = jwt.sign({ id: account.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    
    res.status(200).send({
      id: account.id,
      username: account.username,
      email: credential.email,
      accessToken: token
    });
  } catch(err) {
    res.status(500).send({ message: err.message });
  };
};