/**
 *
 * @param ctx
 * @param next
 * @returns {Promise.<void>}
 */

module.exports = async function (ctx, next) {
  ctx.body = {
    id: ctx.params.id
  };
};