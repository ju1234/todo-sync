module.exports = async (ctx, next) => {
    const { id } = ctx.params;
    ctx.body = {
        code: 200,
        data: []
    };
};