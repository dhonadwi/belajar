import loadNav from './loadNav.js';
import loadPage from './loadPage.js';
const main = () => {

  document.addEventListener("DOMContentLoaded", function () {
    // Activate sidebar nav
    const elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);

    loadNav();

    let page = window.location.hash.substr(1);
    if (page == "") page = "home";
    loadPage(page);
  });
}

export default main;