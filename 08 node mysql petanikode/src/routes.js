const addBookHandler = require('./handler/addBook');
const deleteBookByIdHandler = require('./handler/deleteBookById');
const editBookByIdHandler = require('./handler/editBookById');
const getAllBooksHandler = require('./handler/getAllBooks');
const getBookByIdHandler = require('./handler/getBookById');
const getBookByQueryHandler = require('./handler/getBookByQuery');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'GET',
    path: '/{param?}',
    handler: getBookByQueryHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
