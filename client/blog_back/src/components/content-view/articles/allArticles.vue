<template>
    <div class="content has-text-centered">

      <h1 class="is-title is-bold">{{route.name}}</h1>

      <div class="box">

        <article class="media" v-for="lis in list">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ lis.title }}</strong> <small>阅读量{{ lis.read_num }}</small> <small>更新时间: {{ lis.updatedAt}}</small>
                <br>
                <div v-html="lis.summary"></div>
              </p>
            </div>

            <div >
              <a href="" class="button is-primary">
                编辑
              </a>
              <a href="" class="button is-danger">
                删除
              </a>
            </div>

          </div>
        </article>

      </div>

    </div>
</template>

<script>
    export default {
      data () {
        const route = this.$route;
        return {route}
      },
      computed : {
          list () {
              return this.$store.state.list;
          }
      },
      created () {

        this.$store.dispatch('FETCH_LIST', {
            model: 'posts',
            params: {}
        })
      }

    }
</script>

<style lang="scss" scoped>

</style>
