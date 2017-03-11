<template>
    <div id="main">
        <load :show="show"></load>
        <section id="page">
            <div class="hero-body" style="background: #f9f9f9">
                <div class="container">
                    <p class="title">
                        在标签 <span class="Shining" style="background: #f1f1f1;cursor: pointer;padding: 0.2em;border-radius: 6px; color: #00d1b2">{{ items.name }}</span>下的所有文章
                    </p>
                </div>
            </div>
            <article-summary v-for="item in items.posts" :key="item.id" :article="item" :name="items.name"></article-summary>
        </section>
    </div>
</template>

<script>
  import load from './load.vue';
  import articleSummary from './articleSummary.vue';
  export default {
    name: 'tag',
    metaInfo() {
      return {
        title: `在标签${this.$route.params.id}下的所有文章`
      }
    },
    components: {
      load,
      articleSummary,
    },
    computed: {
      show () {
        return this.$store.state.load;
      },
      items() {
        return this.$store.getters.items;
      },
    },
    preFetch (store,{ path, query, params }, callback) {
      return store.dispatch('FETCH_BY_ID', {
        model: 'tags',
        id: params.id,
        params: {
          where: {
            name: params.id,
          },
          include: 'catTag'
        },
        callback
      })
    }
  }
</script>

<style lang="sass" scoped>

</style>