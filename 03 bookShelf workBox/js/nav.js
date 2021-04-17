document.addEventListener("DOMContentLoaded", function () {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);

  const loadNav = () => {
    return fetch('nav.html')
      .then(response => response.text())
      .then(responseText => {
        document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
          elm.innerHTML = responseText;
        });
        document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
          elm.addEventListener('click', event => {
            const sidenave = document.querySelector(".sidenav");
            M.Sidenav.getInstance(sidenave).close();

            page = event.target.getAttribute("href").substr(1);
            loadPage(page);
          })
        })
      })
  }
  loadNav();

  const loadPage = (page) => {
    const content = document.querySelector('#body-content')
    return fetch(`pages/${page}.html`)
      .then(response => {
        if (response.status === 200) {
          if (page == 'home') {
            getBooks();
          } else if (page === 'saveBook') {
            getSavedBook();
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

  let page = window.location.hash.substr(1);
  if (page == "") {
    page = "home";
  }
  loadPage(page);
});