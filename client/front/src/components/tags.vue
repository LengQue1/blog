<template>
  <section class="section">
      <load :show="show"></load>
      <div class="container">
          <h1 class="title">标签</h1>
          <hr>
          <router-link v-for="item in items" :key="item.name" class="button tagsBtn" :to="{path: `/tag/${item.name}`}" >{{ item.name }}</router-link>
      </div>
  </section>
</template>

<script>
    import load from './load.vue';
    export default{
      data() {
        return {
          title: '标签页'
        }
      },
      metaInfo() {
        return {
          title: this.title
        }
      },
      components: {
        load,
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
        return store.dispatch('FETCH_ITEM', {
          model: 'tags',
          params: {},
          callback
        })
      },
    }
</script>

<style>
    .tagsBtn{
        margin-right: 1em;
        margin-bottom: 1em;
    }
    .tagsBtn:hover {
        border-color: #00d1b2;
        box-shadow: 0 0 0.5em rgba(0, 209, 178, 0.25);
        color: #363636;
    }
    .tagsBtn:active {
        border-color: #4a4a4a;
        box-shadow: inset 0 1px 2px rgba(10, 10, 10, 0.2);
        color: #363636;
    }
</style>