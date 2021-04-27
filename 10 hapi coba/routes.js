const getAllPegawai = require('./handler/getAllPegawai');
const getPegawaiById = require('./handler/getPegawaiById');

const routes = [
    {
        method: 'GET',
        path: '/',
        handler: getAllPegawai,
    },
    {
        method: 'GET',
        path: '/id/{id}',
        handler: getPegawaiById,
    },
    {
        //menggunakan parameter
        method: 'GET',
        path: '/hello/{name?}',
        handler: (request, h) => {
            const { name = 'Stranger!' } = request.params;
            const { lang } = request.query;
            if (lang === 'id') {
                return `Hai, ${name}!`;
            }
            return `Hello, ${name}!`;
        }
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            // return 'Halaman tidak ditemukan';
            const response = h.response({
                status: `fail`,
                message: 'Halaman tidak ditemukan'
            });
            response.type('application/json');
            response.code(404);
            return response;
        },
    },

];

module.exports = routes;