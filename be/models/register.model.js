const db = require("../utils/db");
const bcrypt = require("bcryptjs");

module.exports = {
  register: (entity) => {
    const hash = bcrypt.hashSync(entity.passWord, 8);
    entity.passWord = hash;
    return db.add(entity, "accounts");
  },

  findOneUserName: (userName) =>
    db.load(`select * from accounts where userName = '${userName}'`),
};
