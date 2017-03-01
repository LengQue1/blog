<template>
    <nav class="pagination container">
        <router-link v-if="page > 1" :to="{ query: { page: parseInt(page) - 1} }" class="prev">上一页</router-link>
        <router-link v-if="page < totalPage" :to="{ query: { page: parseInt(page) + 1}  }" class="next">下一页</router-link>
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
    .pagination a {
        display: inline-block;
        margin: 0 4px;
        padding: 4px 12px;
        border-radius: 4px;
        border-bottom: 4px solid #3aa373;
        font-size: 12px;
        color: #fff;
        background-color: #4fc08d;
    }
    .pagination a:hover {
        background-color: #22bd77;
    }
    .pagination {
        justify-content: space-around;
    }
</style>