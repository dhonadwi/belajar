const db = require("./db_config");

const getPegawaiById = (req, h) => {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    const query = `SELECT * from dta_karyawan WHERE id_karyawan ='${id}'`;
    // db.query(query, (err, result) => {
    //   if (err) return reject(err);
    //   if (result.length > 0) {
    //     const response = h.response({
    //       status: `succes`,
    //       data: {
    //         karyawan: result
    //       }
    //     });
    //     response.type('application/json');
    //     response.code(200);

    //     return resolve(response);
    //   } else {
    //     const response = h.response({
    //       status: `fail`,
    //       message: `Data Karyawan tidak ditemukan`
    //     });
    //     response.type('application/json');
    //     response.code(404);

    //     return resolve(response);
    //   }
    // })
    // db.end();
    db.getConnection((error, connection) => {
      if (error) throw error;
      connection.query(query, function (error, result, fields) {
        if (error) return reject(error);
        if (result.length > 0) {
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
        } else {
          const response = h.response({
            status: `fail`,
            message: `Data Karyawan tidak ditemukan`
          });
          response.type('application/json');
          response.code(404);
          connection.destroy();
          return resolve(response);
        }

      });
    });
  })
  // if (book !== undefined) {
  //   const response = h.response({
  //     status: 'success',
  //     data: {
  //       book,
  //     },
  //   });
  //   response.code(200);
  //   return response;
  // }

  // const response = h.response({
  //   status: 'fail',
  //   message: 'Buku tidak ditemukan',
  // });
  // response.code(404);
  // return response;

}

module.exports = getPegawaiById;