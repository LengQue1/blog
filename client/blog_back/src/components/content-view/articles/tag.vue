<template>
  <div class="content has-text-centered">

    <h1 class="is-title is-bold">{{route.name}}</h1>

  </div>
</template>

<script>
  export default {
    data () {
      const route = this.$route
      return {route}
    }
  }
</script>

<style lang="scss" scoped>

</style>
