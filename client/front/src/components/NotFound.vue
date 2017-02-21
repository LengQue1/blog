<template>
    <section class="hero">
        <div class="hero-body">
            <div class="container">
                <h1 class="title">
                    404 NotFound
                </h1>
                <h2 class="subtitle" style="text-align: center;margin-top: 10px;">
                    你要找的文章不存在，你可跳转到 <router-link to="/">首页</router-link>
                </h2>
            </div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'notFoundPage'
    }
</script>

<style>

</style>