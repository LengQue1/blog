<template>
    <nav class="pagination container">
        <router-link v-if="page > 1" :to="{ query: { page: parseInt(page) - 1} }" class="prev">&laquo; 上一页</router-link>
        <router-link v-if="page < totalPage" :to="{ query: { page: parseInt(page) + 1}  }" class="next">下一页 &raquo;</router-link>
    </nav>
</template>

<script>
  export default {
    props: {
      totalPage: Number,
      page: Number
    },
    data () {
      return {}
    }
  }
</script>

<style>
    .pagination {
        justify-content: space-around;
    }
</style>