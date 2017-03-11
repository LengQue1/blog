<template>
    <section class="section">
      <label class="label" style="margin-bottom: 0.5em">设置网站关键字</label>
      <p class="control" style="margin-bottom: 1em;">
         <input class="input is-large" type="text"  v-model="options.keywords.value"  placeholder="keywords">
      </p>
      <label for="" class="label" style="margin-bottom: 0.5em">设置网站信息</label>
      <p class="control" style="margin-bottom: 1em;">
         <input class="input is-large" type="text"  v-model="options.description.value"  placeholder="description">
      </p>
      <a class="button is-primary" @click="submitHandle">提交设置</a>
    </section>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data () {
      return {

      }
    },
    computed : {
      options () {
          return this.$store.state.siteInfo
      }
    },

    created () {
      this.$store.dispatch('FETCH_OPTIONS', {
        model: 'options',
        params: {}
      })
    },
    methods: {
      submitHandle () {

        this.$store.dispatch('FETCH_UPDATE', {
          model: 'options',
          params: {
            form: {
              keywords: {
                value: this.options.keywords.value,
                id: this.options.keywords.id
              },
              description: {
                value: this.options.description.value,
                id: this.options.description.id
              }
            }
          }
        }).then(response => {
          if (response.status == 'fail') {
            this.$message({
              type: 'error',
              message: '文章提交失败!'
            })
          } else {
            this.$message({
              type: 'success',
              message: '文章提交成功!'
            });
          }
        })
      }
    }
  }
</script>

<style>

</style>
