import { getBooks, getBookById } from './api.js';
// const { getBooks, getBookById } = require('./api'); //gak bisa require
const loadPage = (page) => {
  const content = document.querySelector('#body-content')
  return fetch(`pages/${page}.html`)
    .then(response => {
      if (response.status === 200) {
        if (page === 'home') {
          getBooks();
        }
        return response.text()
      } else if (response.status === 404) {
        return "<p>Halaman tidak ditemukan.</p>"
      } else {
        return "<p>Upppss.. Halaman tidak dapat diakses.</p>"
      }
    })
    .then(responseText => content.innerHTML = responseText)
    .then(err => {
      content.innerHTML = `${err}`;
    })
}

export default loadPage;