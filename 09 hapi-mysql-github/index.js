// RESTful API Hapi + Mysql
// memanggil instances hapi
var hapi = require('hapi');
var mysql = require('mysql');

// membuat server dan konfigurasi http
var hapiServer = new hapi.Server();
hapiServer.connection({
    host: 'localhost',
    port: 7728,
    routes: {
        cors: {
            origin: ['*'],
        },
    },
});

// mysql settings
var connection = mysql.createConnection({
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
var noteRouter = require('./routerModule/note.js')(hapiServer, connection);

// menjalankan hapi
hapiServer.start(
    function (err) {
        console.log("hapi berjalan pada port" + hapiServer.info.port)
    }
);