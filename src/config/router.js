module.exports = {
    '/test/:id': {
        method: 'get',
        action: 'test/test.id.js'
    },
    '/userinfo': 'userInfo.js',
    'upload': {
        method: 'post',
        action: 'upload.js'
    }
};