<template>
    <div class="content has-text-centered">

      <h1 class="is-title is-bold">{{route.name}}</h1>

      <div class="box">

        <article class="media" v-for="lis in list">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ lis.title }}</strong> <small>阅读量{{ lis.read_num }}</small> <small>更新时间: {{ lis.updateAt}}</small>
                <br>
                <div v-html="lis.summary"></div>
              </p>
            </div>
            <div >
              <button class="button is-primary" @click="editArticle(lis.id)">编辑</button>
              <button class="button is-danger">删除</button>
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
      },
      methods: {
        editArticle(_id) {
            this.$router.push({
                path: `/post/composePost/${_id}`
            });
        }
      }

    }
</script>

<style lang="scss" scoped>

</style>
