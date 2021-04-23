const db = require("./db_config");

let hasil;
db.connect(function (err) {
  if (err) throw err;

  let sql = "SELECT * FROM dta_karyawan";
  db.query(sql, function (err, result) {
    if (err) throw err;
    hasil = JSON.parse(JSON.stringify(result))
  });
  db.end(function (err) {
    if (err) {
      return console.log('error:' + err.message);
    }
    console.log('Close the database connection.');
  });
});



const getAllBooksHandler = (request, h) => {
  let items = [];
  hasil.forEach((book) => {
    const { id_karyawan, nama_karyawan } = book;
    items.push({ id_karyawan, nama_karyawan });
  });

  const response = h.response({
    status: `success`,
    data: {
      books: items,
    },
  });
  response.code(200);

  return response;
};


module.exports = getAllBooksHandler;
