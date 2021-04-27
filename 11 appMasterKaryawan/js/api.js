import { ndecript } from "./decrypt.js";

// const mainApi = () => {
// const base_url = "http://13.229.240.223:5000/";
const base_url = "https://master-pegawai.herokuapp.com/";

const statusResponse = response => {
  if (response.status !== 200) {
    console.log(`Error : ${response.status}`)
    return Promise.reject(new Error(response.statusText));
  } else {
    return Promise.resolve(response);
  }
}

const json = response => {
  return response.json();
}

const error = error => {
  console.log(`Error: ${error}`);
  document.querySelector('#articles').innerHTML = `${error}`;
}

const getBooks = () => {
  if ('caches' in window) {
    caches.match(`${base_url}books`)
      .then(response => {
        if (response) {
          response.json()
            .then(results => {
              let articleHTML = "";
              results.data.books.forEach(book => {
                articleHTML += `
                                <div class="card">
                                <a href="./book.html?id=${book.id}">
                                  <div class="card-image waves-effect waves-block waves-light">
                                    <img src="https://static.cdn-cdpl.com/270x135/2b9f4ed2c46d42f883ab3439e02cd503/main-visual0-pc.png" />
                                  </div>
                                </a>
                                <div class="card-content">
                                  <span class="card-title truncate">${book.name}</span>
                                  <p>${book.publisher}</p>
                                </div>
                              </div>
                                `
              });
              document.querySelector('#articles').innerHTML = articleHTML;
              // return console.log('pake cache');
            })
        }
      })
  }
  fetch(`${base_url}`)
    .then(statusResponse)
    .then(json)
    .then(results => {
      let articleHTML = '';
      // const apa = ndecript('JLA=');
      // const apa = 'coba';
      results.data.karyawan.forEach(book => {
        articleHTML += `
                <div class="card">
                <a href="./book.html?id=${book.id_karyawan}">
                  <div class="card-image waves-effect waves-block waves-light">
                    <img src="https://static.cdn-cdpl.com/270x135/2b9f4ed2c46d42f883ab3439e02cd503/main-visual0-pc.png" />
                  </div>
                </a>
                <div class="card-content">
                  <span class="card-title truncate">${book.nama_karyawan}</span>
                  <p>${book.cabang} -  <-- apa</p>
                </div>
              </div>
                `
      });
      document.querySelector('#articles').innerHTML = articleHTML;
      // return console.log('dari server');
    })
    .catch(error);

  // showNotifikasiSederhana();

}

const getBookById = () => {
  return new Promise((resolve, reject) => {


    let urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ('caches' in window) {
      console.log('caches' in window);
      caches.match(`${base_url}id/${idParam}`)
        .then(response => {
          if (response) {
            response.json()
              .then(result => {
                const { name, summary } = result.data.book;
                var articleHTML = `
                  <div class="card">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="https://static.cdn-cdpl.com/270x135/2b9f4ed2c46d42f883ab3439e02cd503/main-visual0-pc.png" />
                    </div>
                    <div class="card-content">
                      <span class="card-title">${name}</span>
                      ${summary}
                    </div>
                  </div>
                `;

                document.querySelector('#body-content').innerHTML = articleHTML;
                resolve(result);
              })
          }
        })
    }

    fetch(`${base_url}id/${idParam}`)
      .then(statusResponse)
      .then(json)
      .then(result => {
        const { nama_karyawan, foto, jabatan } = result.data.karyawan[0];
        console.log(result);
        var articleHTML = `
          <div class="card">
            <div class="card-image waves-effect waves-block waves-light">
              <img src="https://static.cdn-cdpl.com/270x135/2b9f4ed2c46d42f883ab3439e02cd503/main-visual0-pc.png" />
            </div>
            <div class="card-content">
              <span class="card-title">${nama_karyawan}</span>
              ${foto} dan ${jabatan}
            </div>
          </div>
        `;

        document.querySelector('#body-content').innerHTML = articleHTML;
        resolve(result);
      })
    // showNotifikasiSederhana();
  })
}

const getSavedBook = () => {
  getAll().then(books => {
    let booksHtml = '';
    books.forEach(book => {
      const { id, name, author, publisher, summary } = book;
      booksHtml += `
      <div class="card">
                    <a href="./book.html?id=${id}&saved=true&name=${name}">
                      <div class="card-image waves-effect waves-block waves-light">
                        <img src="https://static.cdn-cdpl.com/270x135/2b9f4ed2c46d42f883ab3439e02cd503/main-visual0-pc.png" />
                      </div>
                    </a>
                    <div class="card-content">
                      <span class="card-title truncate">${name}</span>
                      <p>Penulis : ${author}, Penerbit : ${publisher}</p>
                      <p>${summary}</p>
                    </div>
                  </div>
      `
    })
    document.querySelector('#body-content').innerHTML = booksHtml;
  })
}



function showNotifikasiSederhana() {
  const title = 'Notifikasi Sederhana';
  const options = {
    // 'body': 'Ini adalah konten notifikasi. \nBisa menggunakan baris baru.',
    'body': `Ini adalah konten notifikasi.
Bisa menggunakan baris.`,
    requireInteraction: true,
    'icon': '/icon/icon.png',
    'badge': '/icon/icon.png',
    'actions': [
      {
        'action': 'yes-action',
        'title': 'Ya',
        // 'icon': '/img/yes.png'
      },
      {
        'action': 'no-action',
        'title': 'Tidak',
        // 'icon': '/img/no.png'
      }
    ],
    //dipake harus bareng
    // 'tag': 'message-group-1',
    // 'renotify': true,
  }
  if (Notification.permission === 'granted') {
    navigator.serviceWorker.ready.then(function (registration) {
      registration.showNotification(title, options);
    });
  } else {
    console.error('FItur notifikasi tidak diijinkan.');
  }
}


// }

// export default getBooks;
export { getBooks, getBookById, getSavedBook };
// module.exports = { getBooks, getBookById };