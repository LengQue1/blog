<template>
  <div class="content has-text-centered">

    <h1 class="is-title is-bold">{{route.name}}</h1>
    <p class="control">
      <input class="input is-large" type="text" v-model="form.name" :placeholder="options.name !=='categories' ? '输入要添加的标签名' : '输入要添加的分类名'">
    </p>
    <p class="control">
      <a class="button is-primary" @click="submitHandle()" v-html="route.params.id ? '确定更改' : '确定添加'"></a>
    </p>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    data () {
      const route = this.$route;
      const form = {};
      return {route, form}
    },
    props: ['options'],
    methods: {
      submitHandle () {
        this.$store.dispatch('POST',{
          model: this.options.model,
          form: this.form
        }).then((response) => {
          if (response.status === 'success') {
            this.$message({
              type: 'success',
              message: '添加成功'
            });
            this.$router.push({ path: `/${this.options.name}/list`})
          } else if (response.status === 'fail') {
            this.$message({
              type: 'error',
              message: response.error
            });
          }
        })
      }
    },
    created() {
      if (typeof this.route.params.id !== 'undefined') {
        this.$store.dispatch('FETCH_BY_ID',{
          model: this.options.model,
          id: this.route.params.id,
          params: {
            id: this.route.params.id
          }
        }).then( response => {
          this.form = response;
        });
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
