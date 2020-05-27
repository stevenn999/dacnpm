// const mysql = require('mysql');
// const { promisify } = require('util');

// const pool = mysql.createPool({
//   connectionLimit: 100,
//   host: 'remotemysql.com',
//   port: 3306,
//   user: 'zhcmA74fFb',
//   password: 'UeXStmpZpD',
//   database: 'zhcmA74fFb'
// });

// const pool_query = promisify(pool.query).bind(pool);

// module.exports = {
//   load: sql => pool_query(sql),
//   add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
// };
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const connectDB = async () => {
  try {
   await mongoose.connect(
      `mongodb+srv://dacnpm_nhom1:dacnpm_nhom1@cluster0-fhlo8.mongodb.net/dacnpm-nhom1?retryWrites=true&w=majority`,

      { useNewUrlParser: true, useUnifiedTopology: true },
      (database) => console.log("connected")
    );
  } catch (error) {
    return console.log("could not connect");
  }
};

module.exports = connectDB;
