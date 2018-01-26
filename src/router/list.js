const DB = require('../DB');

module.exports = async (ctx, next) => {
    const {id} = ctx.params;

    console.log(id);


    ctx.body = {
        a: 1
    }
};
