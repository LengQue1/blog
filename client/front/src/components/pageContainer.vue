<template>
    <article class="container posts">
        <h1 class="title">
            <router-link :to="{name: 'post', params: { pathName: article.pathName }}">{{ article.title }}</router-link>
        </h1>
        <div class="post-meta">
                <span class="post-time">
                 <!--  发表于 -->
                  <time  >
                    {{ article.createdAt }}
                  </time>
                </span>
            <span class="post-read-count">&nbsp; | &nbsp; {{ article.read_num }} 阅读</span>
            <span class="post-category">
                &nbsp; | &nbsp; 分类: {{ article.category }}
               </span>
        </div>
        <div class="summary" v-html="article.summary"></div>
    </article>
</template>

<script>
  export default {
    computed: {
      article () {
        return this.$store.state.page
      }
    },
    preFetch: (store, { path: pathName, params, query }, callback) => {
      pathName = pathName.replace(/^\//g, '')
      return store.dispatch('FETCH_PAGE', {
        model: 'posts',
        params: {
          'order': [
            ['createdAt', 'DESC']
          ],
        },
        callback
      })
    }
  }
</script>

