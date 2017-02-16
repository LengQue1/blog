<template>
    <article class="container posts">
        <h1 class="title">
            <router-link :to="{name: 'post', params: { pathName: article.pathName }}">{{ article.title }}</router-link>
        </h1>
        <div v-html="article.summary"></div>
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

<style lang="scss" scopde>
    .posts{
        margin: 30px 0;
        padding: 0 2rem;
    }
</style>