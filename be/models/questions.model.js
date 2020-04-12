const db = require('../utils/db');

module.exports = {
  all: _ => db.load('select * from questions'),
  //detail: id => db.load(`select * from categories where CatID = ${id}`),
};