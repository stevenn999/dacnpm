const bcrypt = require("bcryptjs");
const registerModel = require("./register.model");

module.exports = {
  login: async (entity) => {
    const AccountExist = await registerModel.findOneUserName(entity.userName);

    if (AccountExist.length === 0) return null;
    const passWord = AccountExist[0].passWord;
    if (bcrypt.compareSync(entity.passWord, passWord)) {
      return AccountExist[0];
    }
    return null;
  },
};
