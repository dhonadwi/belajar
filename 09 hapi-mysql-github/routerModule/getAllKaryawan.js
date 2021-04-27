const getAllKaryawan = function (req, res, h) {

  // mendapatkan id_note , isi_note dan tanggal_note dari tabel note
  var query = "SELECT id_karyawan, nama_karyawan, cabang FROM dta_karyawan";
  connection.query(query, function (err, result, fields) {
    if (err) {
      // jika error maka throw errornya.
      throw err;
    } else {
      if (result.length > 0) {
        let items = [];
        result.forEach((book) => {
          const { id_karyawan, nama_karyawan, cabang } = book;
          items.push({ id_karyawan, nama_karyawan, cabang });
        });
        // jika teradpat data maka, hasil dari query akan diberikan.
        const response = res({
          status: `succes`,
          data: {
            karyawan: items
          }
        });
        response.type('application/json');
        response.code(200);

        return response;
      } else {
        // jika tidak ada data menampilkan pesan.
        const response = res({
          msg: "tidak ada data note pada database"
        });
        // response bertipe application/json
        response.type('application/json');
      }
    }
  });

} // end handler

module.exports = getAllKaryawan;