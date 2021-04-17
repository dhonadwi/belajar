const dbPromised = idb.open("book-Shelf", 1, function(upgradeDb) {
  const articlesObjectStore = upgradeDb.createObjectStore("books", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("id", "id", { unique: false });
});

// function saveForLater(article) {
//   dbPromised
//     .then(function(db) {
//       var tx = db.transaction("articles", "readwrite");
//       var store = tx.objectStore("articles");
//       console.log(article);
//       store.add(article.result);
//       return tx.complete;
//     })
//     .then(function() {
//       console.log("Artikel berhasil di simpan.");
//     });
// }

const saveForLater = article => {
  console.log(article.data.book);
  dbPromised.then(db => {
    const tx = db.transaction('books', 'readwrite');
    const store = tx.objectStore('books');
    // console.log(article);
    store.put(article.data.book);
    return tx.complete;
  })
  .then( () => {
    console.log('Artikel berhasil di simpan');
  })
}