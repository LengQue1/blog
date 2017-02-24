<template>
    <div id="app" class="main-content rounded" style="position: relative">

            <Loading-bar
                :on-progress-done="onProgressDone"
                :progress="progress">
            </Loading-bar>
            <keep-alive>
                <router-view name="NavBar"></router-view>
            </keep-alive>
                <router-view></router-view>
            </keep-alive>
            <keep-alive>
                <my-footer></my-footer>
            </keep-alive>

    </div>
</template>

<script>
    import LoadingBar from './components/Loading.vue'
    import myFooter from  './components/footer.vue';
    export default {
        components: {
            LoadingBar,
            myFooter
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

<style lang="sass">
    @import './assets/css/article.css';
    @import './assets/css/highlight.css';
    @import "~bulma";
    $fa-font-path: '~font-awesome/fonts/';
    @import '~font-awesome/scss/font-awesome';
    .main-content{height: 100%;}
    .main-content #main{

    }
    @media screen  and (min-width: 769px){
        .nav-left {
            justify-content:center;
        }
    }
    @media screen and (min-width: 1192px) {
        .container {
            max-width: 990px;
        }
    }
</style>