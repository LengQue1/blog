<template>
    <div id="main">
        <load :show="show"></load>
        <section id="page">
            <article-summary v-for="item in items" :article="item"></article-summary>
            <pagination :page="page" :totalPage="totalPage"></pagination>
        </section>
    </div>
</template>

<script>
    import load from './load.vue';
    import articleSummary from './articleSummary.vue';
    import pagination from  './pagination.vue';
    export default {
        name: 'main',
        data() {
          return {
            title: '首页'
          }
        },
        metaInfo() {
          return {
            title: this.title
          }
        },
        components: {
          load,
          articleSummary,
          pagination
        },
        computed: {
          show () {
              return this.$store.state.load;
          },
          items() {
              return this.$store.getters.items;
          },
          page () {
            let page = this.$store.state.route.query.page || 1;
            return parseInt(page)
          },
          totalPage () {
            return this.$store.state.totalPage;
          }
        },
        preFetch (store, { path, query, params }, callback) {

          let page = query ? (typeof query.page !== 'undefined') ? parseInt(query.page) : 1 : 1
          if (page < 0) {
            page = 1
          }

            return store.dispatch('FETCH_ITEM', {
                model: 'posts',
                params: {
                  'order': [
                      ['createdAt', 'DESC']
                  ],
                  limit: 4,
                  offset: (page - 1) * 4,
                  include: 'catTag'
                },
                callback
            })
        }
    }
</script>

<style lang="sass" scoped>

</style>