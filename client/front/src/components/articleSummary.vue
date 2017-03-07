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
                &nbsp; | &nbsp;<i class="fa fa-folder-open"></i>分类:  <router-link :to="{ path: `/category/${article.category.id}` }">{{ article.category.name }}</router-link>
               </span>
            <span class="post-tag">
                &nbsp; | &nbsp; <i class="fa fa-tags"></i>标签:
               </span>
        </div>
        <div class="summary" v-html="article.summary"></div>
    </article>
</template>

<script>
    export default {
        props: {
            article: {
                type: Object,
                required: true
            }
        }
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