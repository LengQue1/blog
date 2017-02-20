<template>
    <div>
        <nav class="nav">
            <div class="nav-left">
                <a class="nav-item">
                    <h1>lengQueBlog</h1>
                </a>
            </div>

            <div class="nav-center">
                <a class="nav-item">
                  <span class="icon">
                    <i class="fa fa-github"></i>
                  </span>
                </a>
                <router-link to="/" class="nav-item is-tab " :class="{ 'is-active': isActive}">主页</router-link>
                <router-link to="/archive" class="nav-item is-tab" :class="{'is-active': isActive}">归档</router-link>
            </div>

            <!-- This "nav-toggle" hamburger menu is only visible on mobile -->
            <!-- You need JavaScript to toggle the "is-active" class on "nav-menu" -->
            <span class="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </span>

            <div class="nav-right nav-menu">

            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'NavBar',
        computed: {
            isActive () {
                console.log(this.$route.fullPath)
                return true
            },
            currentPath () {

            }
        }
    }
</script>

<style lang="sass" scoped>
    .nav{
        box-shadow: 1px 1px 4px rgba(0,0,0,.2) ;
    }
</style>