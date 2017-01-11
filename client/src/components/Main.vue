<template>
  <main>
    <h2 class="main-title">This is main </h2>
    <a href="/">Main</a>
    <a href="/view1">view1</a>
    <a href="/view2">view2</a>
  </main>
</template>

<script>
  export default {
    mounted () {
      this.$emit('view', this.meta())
    },

    preFetch () {
      return this.methods.meta()
    },

    methods: {
      meta () {
        return {
          title: 'Vue SSR Template',
          description: 'this is main description',
          keywords: 'view, main'
        }
      }
    }
  }
</script>

<style>
  body{
    background: yellow;
  }
</style>