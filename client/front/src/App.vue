<template>
    <div id="app" class="main-content rounded">
        <Loading-bar
            :on-progress-done="onProgressDone"
            :progress="progress">
        </Loading-bar>
        <keep-alive>
            <router-view name="NavBar"></router-view>
        </keep-alive>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>

    </div>
</template>

<script>
    import LoadingBar from './components/Loading.vue'
    export default {
        components: {
            LoadingBar
        },
        computed: {
            progress () {
                return this.$store.state.progress
            }
        },
        methods: {
            onProgressDone () {

            }
        }
    }
</script>

<style lang="scss">
    @import "~bulma";
    $fa-font-path: '~font-awesome/fonts/';
    @import '~font-awesome/scss/font-awesome';
    .main-content h1{
        display: flex;
        justify-content: center;
    }
    .main-content main{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>