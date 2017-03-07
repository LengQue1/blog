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
                &nbsp;      | &nbsp;<i class="fa fa-folder-open"></i>分类:  <router-link :to="{ path: `/category/${article.category.id}` }">{{ article.category.name }}</router-link>
                    </span>
                   <span class="post-tag">
                &nbsp;    | &nbsp; <i class="fa fa-tags"></i>标签:
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
        preFetch (store, router, { path: pathName, params, query }, callback) {
            pathName = pathName.replace(/^\/post\//g, '');
            if (pathName !== 'index.js.map') {

                return store.dispatch('FETCH_BLOG', {
                    params: {
                        where: {
                            pathName: pathName
                        },
                        include: 'categories'
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