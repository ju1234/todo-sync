const Router = require('koa-router'),
  path = require('path'),
  fs = require('fs');

const { prefix } = require('../config/constant');
const routerList = require('../config/router');

const router = new Router();


Object.keys(routerList).map(method => {
  routerList[method].map(route => {
    routesMounte(method, route);
  });
});


function routesMounte(method, route) {
  const modulePath = path.resolve(__dirname, '../router', method, route.replace(/(\/:)|\//g, '.').replace(/^\./, '') + '.js');
  try {
    fs.statSync(modulePath);
    route = path.join(prefix, route);
    router[method](route, require(modulePath));
    console.log(`${route} has been mounted`);
  }catch (err){
    console.error(`no such file or directory, stat '${modulePath}'`)
  }
}

module.exports = [router.routes(), router.allowedMethods()];