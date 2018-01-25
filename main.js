const Server = require('./src/app');

const server = new Server({ port: 4040 });
server.start();
