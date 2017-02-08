<template>
    <nav class="nav has-shadow app-navbar" :class="{ slideInDown: show, slideOutDown: !show }" v-if="show">
        <div class="container">
            <div class="nav-left">
                <span @click="toggleSidebar(!sidebar.opened)" class="nav-toggle">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                <a href="/" class="nav-item">
                    <h1>Blog Admin</h1>
                </a>
            </div>
            <div  class="nav-right">
                <div class="nav-item is-tab">
                    <figure class="image is-16x16" style="margin-right: 8px;">
                        <img src="~assets/logo.png">
                    </figure>
                    Welcome
                    <!--{{ user.username ? user.username : '' }}-->
                    <a href="#/admin/logout" class="nav-item is-tab">Logout</a>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        props: {
            show: Boolean
        },
        computed: mapGetters({
            sidebar: 'sidebar',

        }),
        methods: mapActions([
            'toggleSidebar'
        ])
    }
</script>

<style>
    .app-navbar {

        position: fixed;
        min-width: 100%;
        z-index: 1024;
    }
</style>
