import loadPage from './loadPage.js';
const loadNav = () => {
  return fetch('nav.html')
    .then(response => response.text())
    .then(responseText => {
      document.querySelectorAll(".topnav, .sidenav").forEach(function (elm) {
        elm.innerHTML = responseText;
      });
      document.querySelectorAll(".sidenav a, .topnav a").forEach(elm => {
        elm.addEventListener('click', event => {
          let page;
          const sidenave = document.querySelector(".sidenav");
          M.Sidenav.getInstance(sidenave).close();

          page = event.target.getAttribute("href").substr(1);
          loadPage(page);
        })
      })
    })
}

export default loadNav;