const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');

const routeMiddleware = require('./middleware/router');

class Server {
  constructor(options) {
    this.port = options.port;

    this._init();
  }

  _init() {
    this.app = new Koa();
    this._middlewareMount();
  }

  _middlewareMount() {
    this.app.use(bodyparser());
    this.app.use(logger());

    routeMiddleware.forEach(middleware => {
      this.app.use(middleware);
    });
  }

  start() {
    this.server = this.app.listen(this.port, (err) => {
      if (err) {
        console.log('server start error: ', err);
      } else {
        console.log(`server start with port ${this.port}`);
      }
    });
  }

  close() {
    this.server && this.server.close();
  }
}


module.exports = Server;
