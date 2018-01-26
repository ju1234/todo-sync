module.exports = {
    '/test/:id': {
        method: 'get',
        action: 'test/test.id.js'
    },
    // '/userinfo': 'userInfo.js',
    'push': {
        method: 'post',
        action: 'todo/push.js'
    },
    'pull': {
        method: ['post', 'options'],
        action: 'todo/pull.js'
    },
    'list/:id': 'list'
};