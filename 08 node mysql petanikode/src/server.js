const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    //    port: 5000,
    //  host: 'localhost',
    // host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.19.98',
    // "start-prod": "NODE_ENV=production node ./src/server.js",
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
