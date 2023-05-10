var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "db",
  user: "root",
  password: "toor"
});

module.exports = con;