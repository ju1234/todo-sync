module.exports = {
    '/test/:id': {
        method: 'get',
        action: 'test/test.id.js'
    },
    // '/userinfo': 'userInfo.js',
    'push/:id': {
        method: 'post',
        action: 'todo/push.js'
    },
    'pull/:id': {
        method: 'get',
        action: 'todo/pull.js'
    },
    'heartbeat': 'todo/heartbeat',
    'list/:id': 'list'
};