module.exports = function generateActions (model) {
    return {

        findAll: async (ctx, next) => {

            let query = {};

            if (ctx.request.query.attributes) {
                query = {
                    attributes: JSON.parse(ctx.request.query.attributes)
                }
            }
            if (ctx.request.query.where) {
                query = {
                    where: JSON.parse(ctx.request.query.where)
                }
            }
            let result = await model.findAll(query);

            return ctx.body = result;
        }

    }
};