/**
 * 挂载路由
 * @type {Router}
 */

const Router = require('koa-router'),
    path = require('path'),
    fs = require('fs');

const { prefix } = require('../config/constant');
const routerList = require('../config/router');

const router = new Router();


Object.keys(routerList).map(route => {
    let method, action;
    const options = routerList[route];
    if (typeof options === 'string') {
        method = 'get';
        action = options;
    } else if (Object.prototype.toString.call(options) === '[object Object]') {
        if (!options.method) {
            method = 'get';
        } else {
            methodValidate(options.method);
            method = options.method;
        }
        action = options.action;
    } else {
        throw new Error('route options must be string or object');
    }

    routesMounte(method.toLowerCase(), route, getActionPath(action));
});


function routesMounte(method, route, actionPath) {
    try {
        fs.statSync(actionPath);
    } catch (err) {
        console.error(`no such file or directory, stat '${actionPath}'`);
    }

    route = path.join(prefix, route);
    router[method](route, require(actionPath));
    console.log(`${route} has been mounted`);
}

// 获取action地址
function getActionPath(action) {
    if (!/\.js/.test(action)) {
        action = action + '.js';
    }
    return path.join(__dirname, '../router', action);
}

function methodValidate(method) {
    const result = ['get', 'post', 'put', 'options', 'head', 'delete', 'trace', 'connect'].some(item => {
        return (new RegExp(item, 'i')).test(method);
    });

    if (!result) {
        throw new Error(`Unrecognized HTTP method ${method}`);
    }
}


module.exports = [router.routes(), router.allowedMethods()];