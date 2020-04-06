const mysql = require('mysql');
const { promisify } = require('util');


const pool = mysql.createPool({
  connectionLimit: 100,
  host: 'remotemysql.com',
  port: 3306,
  user: 'zhcmA74fFb',
  password: 'UeXStmpZpD',
  database: 'zhcmA74fFb'
});

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
};
