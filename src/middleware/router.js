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
            method = options.method;
        }
        action = options.action;
    } else {
        throw new Error('route options must be string or object');
    }

    routesMounte(method, route, getActionPath(action));
});

/**
 * 路由挂载
 * @param method
 * @param route
 * @param actionPath
 */
function routesMounte(method, route, actionPath) {
    try {
        fs.statSync(actionPath);
    } catch (err) {
        console.error(`no such file or directory, stat '${actionPath}'`);
    }
    methodValidate(method);

    route = path.join(prefix, route);
    if(Array.isArray(method)){
        method.map( m => {
            router[m.toLowerCase()](route, require(actionPath));
        })
    }else {
        router[method.toLowerCase()](route, require(actionPath));
    }
    console.log(`${route} has been mounted`);
}

/**
 * 接口处理文件路劲拼接
 * @param action
 * @returns {*}
 */
function getActionPath(action) {
    if (!/\.js/.test(action)) {
        action = action + '.js';
    }
    return path.join(__dirname, '../router', action);
}

/**
 *
 * @param method
 */
function methodValidate(method) {
    const result = ['get', 'post', 'put', 'options', 'head', 'delete', 'trace', 'connect'].some(item => {
        if(Array.isArray(method)){
            return method.some(m => (new RegExp(item, 'i')).test(m))
        }
        return (new RegExp(item, 'i')).test(method);
    });

    if (!result) {
        throw new Error(`Unrecognized HTTP method ${method}`);
    }
}


module.exports = [router.routes(), router.allowedMethods()];