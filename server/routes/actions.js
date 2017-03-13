module.exports = function generateActions (model, sequelize) {
    return {

        findAll: async (ctx, next) => {

            let query = ctx.request.query || {};

            if (ctx.request.query.params) {
                query = JSON.parse(ctx.request.query.params);

                try {
                    if (query.include == 'catTag' && model.name === 'posts') {
                        query.include = [{ model: sequelize.models.categories },{ model: sequelize.models.tags }];
                    }

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
                if (ctx.request.body.tags) {
                  ctx.request.body.tags.map(async (el, index) => {
                    let findTag = await model.sequelize.models.tags.findAll({
                      where: {
                          id: el.id
                      }
                    });
                    result.setTags(findTag);
                  });
                }

                ctx.status = 201;
                return ctx.body = {
                    status: 'success',
                    data: '添加成功'
                }

            } catch (e) {

                return ctx.body = {
                    status: 'fail',
                    error: e
                };
            }

        },

        findById: async (ctx, next) => {

            let result;
            let query = JSON.parse(ctx.request.query.params);

            try {

                if (query.include === 'posts') {
                  query.include = [{ model: sequelize.models.posts }];
                } else if (query.include === 'tags') {
                  query.include = [{ model: sequelize.models.tags }];
                } else if (query.include === 'catTag') {
                  query.include = [
                    {
                      model: sequelize.models.posts,
                      include: [{ model: sequelize.models.tags }, { model: sequelize.models.categories }]
                    }
                  ]
                }

                result = await model.find(query);

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
                let result = await model.build(ctx.request.body, {
                  where: {
                      id: ctx.request.body.id
                  },
                    isNewRecord: false
                });
                await result.save();

              if (ctx.request.body.tags) {
                result.setTags([]);
                await ctx.request.body.tags.map(async (el, index) => {
                  let findTag =  await model.sequelize.models.tags.findAll({
                    where: {
                      id: el.id
                    }
                  });
                  result.setTags(findTag)
                });
              }

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

        update: async (ctx, next) => {
          let result, query;

          try {

              query = ctx.request.body;
              for(let opt in query.form) {
                  result = await model.update(query.form[opt], {
                      where: {
                          id: query.form[opt].id
                      },
                  })
              }

              return ctx.body = {
                  status: 'success',
                  message: '更新成功'
              }

          } catch (e) {
              console.log(e);
              return ctx.body = {
                  status: 'fail',
                  error: e
              }
          }

        },

        replaceId: async (ctx, next) => {
            let result;

            try {



            } catch (e) {
                return ctx.body = {
                    status: 'fail',
                    error: e
                }
            }
        }

    }
};