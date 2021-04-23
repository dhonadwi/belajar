const books = require('../books');

const getBookByQueryHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  let book;
  let read;
  let finish = false;
  if (name) {
    book = books.filter((b) => b.name.indexOf(name) > -1);
  } else if (reading) {
    if (reading === '1') {
      read = true;
    } else if (reading === '0') {
      read = false;
    } else {
      read = 'all';
    }
    if (read === 'all') {
      const items = [];
      books.forEach((b) => {
        // const { name, publisher } = b;
        const nama = b.name;
        const { publisher } = b;
        items.push({ nama, publisher });
      });
      const response = h.response({
        status: 'success',
        data: {
          books: items,
        },
      });
      response.code(200);
      return response;
    }
    const items = books.filter((b) => b.reading === read);
    book = [];
    items.forEach((item) => {
      // const { name, publisher } = item;
      const namaBuku = item.name;
      const { publisher } = item;
      book.push({ namaBuku, publisher });
    });
  } else if (finished) {
    if (finished === '1') {
      finish = true;
    }
    book = books.filter((b) => b.finished === finish);
  }
  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = getBookByQueryHandler;
