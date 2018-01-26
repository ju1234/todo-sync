module.exports = async (ctx, next) => {
    const { id } = ctx.params;
    console.log(ctx.request.body);

    ctx.body = {
        a: ctx.request.body
    }
};