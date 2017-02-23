<template>
   <article>
       <div class="postContent container">
           <header class="post-header">
               <h1 class="post-title title" >
                   {{ article.title }}
               </h1>
               <div class="post-meta">
                <span class="post-time">
                 <!--  发表于 -->
                  <time  >
                    {{ article.updateAt }}
                  </time>
                </span>
                   <span class="post-read-count">&nbsp; | &nbsp; {{ article.read_num }} 阅读</span>
                   <span class="post-category">
                &nbsp; | &nbsp; 分类于 {{ article.category }}
               </span>
               </div>
           </header>
           <div class="post-body" v-html="article.content">

           </div>
       </div>
   </article>
</template>

<script>
    export default {
        name: 'post',
        computed: {
            article () {
                return this.$store.state.blog
            }
        },
        preFetch (store, { path: pathName, params, query }, callback) {
            pathName = pathName.replace(/^\/post\//g, '');
            if (pathName !== 'index.js.map') {

                return store.dispatch('FETCH_BLOG', {
                    params: {
                        where: {
                            pathName: pathName
                        }
                    },
                    callback
                })
            }
        }
    }
</script>

<style lang="sass" scoped>
    .postContent{
        padding: 2.5rem;
    }
</style>