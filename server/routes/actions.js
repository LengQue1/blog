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
        },

        create: async (ctx, next) => {
            let result;
            console.log(ctx.request.body)
            try {
                result = await model.create(ctx.request.body);
                ctx.status = 201;
                return ctx.body = result
            } catch (e) {

                return ctx.body = {
                    status: 'fail',
                    error: e
                };
            }

        },

        findById: async (ctx, next) => {

        },

        updateById: async (ctx, next) => {

        },

        deleteById: async (ctx, next) => {

        }

    }
};