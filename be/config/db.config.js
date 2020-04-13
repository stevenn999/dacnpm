module.exports = {
  HOST: "remotemysql.com",
  USER: "zhcmA74fFb",
  PASSWORD: "UeXStmpZpD",
  DB: "zhcmA74fFb",
  PORT: 3306,
  dialect: "mysql",
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};