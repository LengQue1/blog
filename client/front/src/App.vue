<template>
    <div id="app" class="main-content rounded">

            <Loading-bar
                :on-progress-done="onProgressDone"
                :progress="progress">
            </Loading-bar>
            <keep-alive>
                <router-view name="NavBar"></router-view>
            </keep-alive>
        <transition
                mode="out-in"
                enter-active-class="fadeIn"
                leave-active-class="fadeOut"
                appear>
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>

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

<style lang="sass">
    @import './assets/css/article.css';
    @import './assets/css/highlight.css';
    @import "~bulma";
    $fa-font-path: '~font-awesome/fonts/';
    @import '~font-awesome/scss/font-awesome';

    .main-content main{
        display: flex;
        flex-direction: column;
        align-items: center;
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