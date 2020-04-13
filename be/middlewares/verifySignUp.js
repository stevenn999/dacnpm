const db = require("../models");
const Account = db.account;
const LocalCredential = db.localCredential;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // Username
  var account = await Account.findOne({
    where: {
      username: req.body.username
    }
  });

  if (account) {
    res.status(400).send({
      message: "Failed! Username is already in use!"
    });
    return;
  }

  account = await LocalCredential.findOne({
    where: {
      email: req.body.email
    }
  });

  if (account) {
    res.status(400).send({
      message: "Failed! Email is already in use!"
    });
    return;
  }

  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;
