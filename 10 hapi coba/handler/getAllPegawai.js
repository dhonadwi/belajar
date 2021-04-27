const db = require("./db_config");

const getAllPegawai = (req, h) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT id_karyawan, nama_karyawan, cabang FROM dta_karyawan`;
    // db.query(query, function (err, result) {
    //   if (err) return reject(err);
    //   const response = h.response({
    //     status: `succes`,
    //     data: {
    //       karyawan: result
    //     }
    //   });
    //   response.type('application/json');
    //   response.code(200);

    //   return resolve(response);
    // });
    // db.end();
    db.getConnection((error, connection) => {
      if (error) throw error;
      connection.query(query, function (error, result, fields) {
        if (error) return reject(error);
        const response = h.response({
          status: `succes`,
          data: {
            karyawan: result
          }
        });
        response.type('application/json');
        response.code(200);

        connection.destroy();
        return resolve(response);
      });
    });
  })




  // db.query(query, function (err, result, fields) {
  //   if (err) {
  //     return `ada error uy :${err}`;
  //   } else {
  //     if (result.length > 0) {

  //sini
  // const response = h.response({
  //   status: `succes`,
  //   data: {
  //     karyawan: hasil
  //   }
  // });
  // response.type('application/json');
  // response.code(200);

  // return response;
  //     } else {
  //       const response = h.response({
  //         msg: "tidak ada data note pada database"
  //       });
  //       response.type('application/json');
  //       return response;
  //     }
  //   }
  // });
  // return `Kunaon uy`;
}
// db.end();

module.exports = getAllPegawai;