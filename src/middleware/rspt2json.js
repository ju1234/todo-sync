async function rspt2json(ctx, next) {
    ctx.type = 'json';
    await next();
}

module.exports = rspt2json;