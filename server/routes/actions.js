module.exports = function generateActions (model, sequelize) {
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

            if (ctx.request.query.params) {
                query = JSON.parse(ctx.request.query.params);

                try {

                    if (query.where.pathName != undefined) {
                        let results = await model.findAll(query);
                        for (let result of results) {
                            result.read_num ++;
                            await result.save();
                        }
                        ctx.status = 200;
                        return ctx.body = results;
                    }

                } catch (e) {

                }

            }

            let result = await model.findAll(query);
            ctx.status = 200;
            return ctx.body = result;
        },

        create: async (ctx, next) => {
            let result;

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

            let result;

            try {

                result = await model.findById(ctx.request.query.id)
                ctx.status = 201;
                return ctx.body = result;

            } catch (e) {

                return ctx.body = {
                    status: 'fail',
                    error: e
                }

            }

        },

        updateById: async (ctx, next) => {

            try {
                  await sequelize.transaction (async (t) => {
                     return await model.update(ctx.request.body, {
                        where: {
                            id: ctx.request.body.id
                        },
                        transaction: t
                    });
                });


                return ctx.body = {
                   message: '提交成功',
                    status: 'success'
                };

            } catch(e) {
                return ctx.body = {
                    status: 'fail',
                    error: e
                }
            }

        },

        deleteById: async (ctx, next) => {
            let result;

            try {

                result = await model.destroy({ where: { id: ctx.params.id}});
                return ctx.body = {
                    status: 'success',
                    message: '删除成功！'
                }
            } catch(e) {
                return ctx.body = {
                    status: 'fail',
                    error: e
                }
            }
        },

        replaceId: async (ctx, next) => {

        }

    }
};