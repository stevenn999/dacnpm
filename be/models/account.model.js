module.exports = (sequelize, Sequelize) => {
  const Account = sequelize.define("account", {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      primaryKey: true,
    },
    username: {
      type: Sequelize.STRING,
    }
  });
  return Account;
};