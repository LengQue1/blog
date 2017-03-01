<template>
  <div class="content has-text-centered">

    <h1 class="is-title is-bold">{{route.name}}</h1>
    <table class="table is-striped"　style="margin-top: 2em;">
      <thead>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th><abbr title="标签">标签</abbr></th>
        <th><abbr title="操作">操作</abbr></th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th>1</th>
        <td><a >标签</a></td>
        <td>
          <a href="" class="button is-danger  is-small" title="删除">删除</a>
          <a href="" class="button is-primary  is-small" title="编辑">编辑</a>
        </td>
      </tr>
      </tbody>
    </table>
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
