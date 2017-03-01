<template>
  <div class="content has-text-centered">

    <h1 class="is-title is-bold">{{route.name}}</h1>
    <p class="control">
      <input class="input is-large" type="text" placeholder="输入要添加的标签名">
    </p>
    <p class="control">
      <a class="button is-primary ">
        确定添加
      </a>
    </p>

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
