const base_url = "http://13.229.240.223:5000/";

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
    // console.log(`${base_url}books`);
    // console.log('caches' in window);
    // console.log(caches.match(`${base_url}books`));
    if ('caches' in window) {
        caches.match(`${base_url}books`)
            .then(response => {
                if (response) {
                    response.json()
                        .then(results => {
                            console.log(results);
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
                            return console.log('pake cache');
                        })
                }
            })
    }
    fetch(`${base_url}books`)
        .then(statusResponse)
        .then(json)
        .then(results => {
            let articleHTML = '';
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
            console.log('dari server');
        })
        .catch(error);

}

const getBookById = () => {
    let urlParams = new URLSearchParams(window.location.search);
    const idParam = urlParams.get("id");
    if ('caches' in window) {
        console.log('caches' in window);
        caches.match(`${base_url}books/${idParam}`)
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
                        })
                }
            })
    }

    fetch(`${base_url}books/${idParam}`)
        .then(statusResponse)
        .then(json)
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

        })

}