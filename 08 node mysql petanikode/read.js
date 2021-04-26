const db = require("./db_config");

let hasil;
db.connect(function (err) {
  if (err) throw err;

  let sql = "SELECT * FROM dta_karyawan";
  db.query(sql, function (err, result) {
    if (err) throw err;
    // console.log(JSON.stringify(result));
    // hasil = JSON.stringify(result);
    hasil = JSON.parse(JSON.stringify(result))
  });
  db.end(function (err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });
});

console.log(hasil);


// module.exports = hasil;