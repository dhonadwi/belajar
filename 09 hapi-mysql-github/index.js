// RESTful API Hapi + Mysql
// memanggil instances hapi
const hapi = require('@hapi/hapi');
const mysql = require('mysql');

// membuat server dan konfigurasi http
const hapiServer = hapi.Server({
    host: 'localhost',
    port: 7728,
    routes: {
        cors: {
            origin: ['*'],
        },
    },
});


// mysql settings
const connection = mysql.createConnection({
    // host: 'ksucipta.org',
    // user: 'u5983700_karyawan',
    // password: 'KSUcipta132',
    // database: 'u5983700_karyawan'
    host: 'localhost',
    user: 'root',
    password: 'p6s2y805',
    database: 'master_karyawan'
});

connection.connect(function (err) {
    if (err) {
        console.log('something wrong with mysql database connection');
        connection.end();
    }
});

// route list
// const noteRouter = require('./routerModule/note.js')(hapiServer, connection);
const routerModule = require('./routerModule/note')(hapiServer, connection);
hapiServer.route(routerModule);

// menjalankan hapi
hapiServer.start(
    function (err) {
        console.log("hapi berjalan pada port" + hapiServer.info.port)
    }
);