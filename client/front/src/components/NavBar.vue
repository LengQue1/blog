<template>

    <nav class="nav">
        <div class="nav-left">
            <router-link to="/" class="nav-item">
                <h1>LeavinsBlog</h1>
            </router-link>
        </div>

        <div class="nav-center">
        </div>

        <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
        <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
        <span class="nav-toggle" :class="{'is-active': Toggle}"  @click="toggleBar">
            <span></span>
            <span></span>
            <span></span>
        </span>

        <div class="nav-right nav-menu" :class="{'is-active': Toggle}">
            <a class="nav-item" href="https://github.com/LengQue1" target="_blank">
              <span class="icon">
                <i class="fa fa-github"></i>
              </span>
            </a>
            <router-link to="/" class="nav-item is-tab " :class="{ 'is-active': curPath == '/'}" >主页</router-link>
            <router-link to="/archive" class="nav-item is-tab" :class="{'is-active': curPath == '/archive'}" >归档</router-link>
            <router-link to="/tags" class="nav-item is-tab" :class="{'is-active': curPath == '/tags'}" >标签</router-link>
        </div>
    </nav>

</template>

<script>
    import mixin from '../mixin/meta';
    export default {
        name: 'NavBar',
        mixins: [mixin],
        computed: {
            curPath () {
                return this.$store.state.curPath;
            },
            Toggle () {
                return this.$store.state.toggle;
            }
        },
        methods: {
            toggleBar () {
                this.$store.dispatch('SET_TOGGLE', !this.Toggle)
            }
        },
        created() {
            this.$store.state.curPath = this.$store.state.route.fullPath;
        },
        metaInfo () {
          const {
            title: { value: title },
            description: { value: description },
            keywords: { value: keywords },
            faviconUrl: { value: favicon }
          } = this.siteInfo;

          return {
            title,
            titleTemplate: `%s - ${title}`,
            meta: [
              { name: 'charset', content: 'UTF-8' },
              { name: 'description', content: description },
              { name: 'keywords', content: keywords },
              { name: 'viewport', content: 'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' }
            ],
            link: [
              { rel: 'icon', href: favicon },
            ]
          }
        },
        preFetch (store,{ path, query, params }, callback) {
          return store.dispatch('FETCH_OPTIONS', {
            model: 'options',
            params: {},
            callback
          })
        },
    }
</script>

<style lang="sass" scoped>
    .nav{
        box-shadow: 1px 1px 4px rgba(0,0,0,.2) ;
    }
    .nav-menu{
        justify-content: center;
    }
</style>