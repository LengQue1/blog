<template>
    <article class="container posts">
        <h1 class="title">
            <router-link :to="{name: 'post', params: { pathName: article.pathName }}">{{ article.title }}</router-link>
        </h1>
        <div class="post-meta">
            <span class="post-time">
             <!--  发表于 -->
              <time>
                  <i class="fa fa-calendar"></i>{{ article.createdAt == undefined ? article.createdAt : createdAt }}
              </time>
            </span>
            <span class="post-read-count">&nbsp; | <i class="fa fa-eye"></i>{{ article.read_num }}</span>
            <span class="post-category">
                &nbsp; | &nbsp;<i class="fa fa-folder-open"></i><router-link :to="{ path: `/category/${article.categoryId}` }">{{article.category ? article.category.name : name}}</router-link>
               </span>
            <span class="post-tag">
                &nbsp; | &nbsp; <i class="fa fa-tags"></i><router-link v-for="tag in article.tags" :to="{ path: `/tag/${tag.name}` }">#{{ tag.name }}, </router-link>
               </span>
        </div>
        <div class="summary" v-html="article.summary"></div>
    </article>
</template>

<script>
    export default {
      props: ['article','name'],
      computed: {
        createdAt() {
          return this.article.createdAt.slice(0, 7);
        }
      },
    }
</script>

<style lang="sass">
    .summary {
        margin-bottom: 20px;
    }
    .posts{
        margin-top: 30px;
        margin-bottom: 30px;
        padding: 0 2rem;
    }
    .post-meta{
        font-size: 12px;
    }
    .post-meta span i {
        vertical-align: middle;margin-right: 0.5em;
    }
</style>