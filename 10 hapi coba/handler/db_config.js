const mysql = require('mysql');

// const db = mysql.createConnection({
const db = mysql.createPool({
  connectionLimit: 5,
  // host: "localhost",
  // user: "root",
  // password: "p6s2y805",
  // database: "master_karyawan"
  host: "ksucipta.org",
  user: "u5983700_karyawan",
  password: "KSUcipta132",
  database: "u5983700_karyawan"
});

// db.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

module.exports = db;

// exports.handler = (event) => {
//   pool.getConnection((error, connection) => {
//     if (error) throw error;
//     connection.query(`
//       INSERT INTO table_name (event) VALUES ('${event}')
//     `, function(error, results, fields) {
//       if (error) throw error;
//       connection.destroy();
//     });
//   });
// };