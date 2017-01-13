<template>
  <main>
    <h2 class="main-title">{{ test }}</h2>
    <a href="/">Main</a>
    <a href="/view1">view1</a>
    <a href="/view2">view2</a>
  </main>
</template>

<script>
  export default {
    data () {
      return {
        test2: ''
      }
    },
    mounted () {
      this.$emit('view', this.meta())
    },

    preFetch () {
      return this.methods.meta()
    },
    computed: {
      test () {
        return this.$store.state.test;
      }
    },
    methods: {
      meta () {
        return {
          title: 'Vue SSR Template',
          description: 'this is main description',
          keywords: 'view, main'
        }
      }
    },
    preFetch (store, router, context) {
      console.log(store)
      console.log(router)
      console.log(context)
      return store.dispatch('FETCH_TEST')
    }
  }
</script>

<style>
  body{
    background: yellow;
  }
</style>