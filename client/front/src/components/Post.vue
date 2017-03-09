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
                  <time>
                      <i class="fa fa-calendar"></i>{{ article.createdAt.slice(0, 7) }}
                  </time>
                </span>
                   <span class="post-read-count">&nbsp; | <i class="fa fa-eye"></i>{{ article.read_num }}</span>
                   <span class="post-category">
                &nbsp;      | &nbsp;<i class="fa fa-folder-open"></i><router-link :to="{ path: `/category/${article.category.id}` }">{{ article.category.name }}</router-link>
                    </span>
                   <span class="post-tag">
                &nbsp;    | &nbsp; <i class="fa fa-tags"></i><router-link v-for="tag in article.tags" :to="{ path: `/tag/${tag.name}` }"> #{{ tag.name }}, </router-link>
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
                model: 'posts',
                  params: {
                      where: {
                          pathName: pathName
                      },
                      include: 'catTag'
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