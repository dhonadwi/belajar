let mysql = require('mysql');

let db = mysql.createConnection({
  host: "ksucipta.org",
  user: "u5983700_karyawan",
  password: "KSUcipta132",
  database: "u5983700_karyawan"
  // host: "localhost",
  // user: "root",
  // password: "p6s2y805",
  // database: "master_karyawan"
});

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = db;