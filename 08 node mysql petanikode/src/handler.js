// const { nanoid } = require('nanoid');
// const books = require('./books');

// const addBookHandler = (request, h) => {
//   const {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading,
//   } = request.payload;

//   const id = nanoid(16);
//   const insertedAt = new Date().toISOString();
//   const updatedAt = insertedAt;
//   let finished = false;
//   if (pageCount === readPage) {
//     finished = true;
//   }

//   const newbook = {
//     id,
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     finished,
//     reading,
//     insertedAt,
//     updatedAt,
//   };

//   if (name === null || name === '' || name === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan buku. Mohon isi nama buku',
//     });
//     response.code(400);
//     return response;
//   }
//   if (readPage > pageCount) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
//     });
//     response.code(400);
//     return response;
//   }
//   books.push(newbook);
//   const isSuccess = books.filter((book) => book.id === id).length > 0;
//   if (isSuccess) {
//     const response = h.response({
//       status: 'success',
//       message: 'Buku berhasil ditambahkan',
//       data: {
//         bookId: id,
//       },
//     });
//     response.code(201);
//     return response;
//   }
//   const response = h.response({
//     status: 'fail',
//     message: 'Buku gagal ditambahkan',
//   });
//   response.code(500);
//   return response;
// };

// const getAllBooksHandler = (request, h) => {
//   const items = [];
//   books.forEach((book) => {
//     const { id, name, publisher } = book;
//     items.push({ id, name, publisher });
//   });
//   const response = h.response({
//     status: 'success',
//     data: {
//       books: items,
//     },
//   });
//   response.code(200);
//   return response;
// };

// const getBookByQueryHandler = (request, h) => {
//   const { name, reading, finished } = request.query;

//   let book;
//   let read;
//   let finish = false;
//   if (name) {
//     book = books.filter((b) => b.name.indexOf(name) > -1);
//   } else if (reading) {
//     if (reading === '1') {
//       read = true;
//     } else if (reading === '0') {
//       read = false;
//     } else {
//       read = 'all';
//     }
//     if (read === 'all') {
//       const items = [];
//       books.forEach((b) => {
//         // const { name, publisher } = b;
//         const nama = b.name;
//         const { publisher } = b;
//         items.push({ nama, publisher });
//       });
//       const response = h.response({
//         status: 'success',
//         data: {
//           books: items,
//         },
//       });
//       response.code(200);
//       return response;
//     }
//     const items = books.filter((b) => b.reading === read);
//     book = [];
//     items.forEach((item) => {
//       // const { name, publisher } = item;
//       const namaBuku = item.name;
//       const { publisher } = item;
//       book.push({ namaBuku, publisher });
//     });
//   } else if (finished) {
//     if (finished === '1') {
//       finish = true;
//     }
//     book = books.filter((b) => b.finished === finish);
//   }
//   if (book !== undefined) {
//     const response = h.response({
//       status: 'success',
//       data: {
//         book,
//       },
//     });
//     response.code(404);
//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Buku tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };

// const getBookByIdHandler = (request, h) => {
//   const { id } = request.params;
//   const book = books.filter((b) => b.id === id)[0];
//   if (book !== undefined) {
//     const response = h.response({
//       status: 'success',
//       data: {
//         book,
//       },
//     });
//     response.code(200);
//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Buku tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };

// const editBookByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const {
//     name,
//     year,
//     author,
//     summary,
//     publisher,
//     pageCount,
//     readPage,
//     reading,
//   } = request.payload;
//   const updatedAt = new Date().toISOString();
//   let finished = false;
//   if (pageCount <= readPage) {
//     finished = true;
//   }
//   if (name === null || name === '' || name === undefined) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal memperbarui buku. Mohon isi nama buku',
//     });
//     response.code(400);
//     return response;
//   }
//   if (readPage > pageCount) {
//     const response = h.response({
//       status: 'fail',
//       message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
//     });
//     response.code(400);
//     return response;
//   }

//   const index = books.findIndex((book) => book.id === id);

//   if (index !== -1) {
//     books[index] = {
//       ...books[index],
//       id,
//       name,
//       year,
//       author,
//       summary,
//       publisher,
//       pageCount,
//       readPage,
//       finished,
//       reading,
//       updatedAt,
//     };

//     const response = h.response({
//       status: 'success',
//       message: 'Buku berhasil diperbarui',
//     });
//     response.code(200);
//     return response;
//   }
//   const response = h.response({
//     status: 'fail',
//     message: 'Gagal memperbarui buku. Id tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };

// const deleteBookByIdHandler = (request, h) => {
//   const { id } = request.params;

//   const index = books.findIndex((book) => book.id === id);

//   if (index !== -1) {
//     books.splice(index, 1);
//     const response = h.response({
//       status: 'success',
//       message: 'Buku berhasil dihapus',
//     });
//     response.code(200);
//     return response;
//   }

//   const response = h.response({
//     status: 'fail',
//     message: 'Buku gagal dihapus. Id tidak ditemukan',
//   });
//   response.code(404);
//   return response;
// };
// module.exports = {
// getBookByIdHandler,
// getBookByQueryHandler,
// editBookByIdHandler,
// deleteBookByIdHandler,
// };
