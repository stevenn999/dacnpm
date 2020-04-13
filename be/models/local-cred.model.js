// local credential
module.exports = (sequelize, Sequelize) => {
  const LocalCredential = sequelize.define("localCredential", {
    id: {
      allowNull: false,
      type: Sequelize.UUID,
      primaryKey: true,
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    }
  });
  return LocalCredential;
};