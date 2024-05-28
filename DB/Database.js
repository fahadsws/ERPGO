const mysql = require('mysql');

const pool = mysql.createPool({
  host: "138.197.7.241",
  user: "root",
  password: "sws@2026",
  database: "erpgo",
  port:3306
});
module.exports = pool;