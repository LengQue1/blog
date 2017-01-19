<template>
  <div id="app">
      <Navbar :show="true"></Navbar>
      <Sidebar :show="sidebar.opened && !sidebar.hidden"></Sidebar>
  </div>
</template>

<script>

import Navbar  from 'components/NavBar.vue'
import Sidebar  from 'components/SideBar.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    Navbar,
    Sidebar
  },
  beforeMount () {
    const { body } = document;
    const WIDTH = 768;
    const RATIO = 3;
    const handle = () => {
      if (!body.hidden) {
        let rect =  body.getBoundingClientRect();
        let isMobile = rect.width - RATIO < WIDTH;
        this.toggleDevice(isMobile ? 'mobile' : 'other');
        this.toggleSidebar(!isMobile);
      }
    }
    document.addEventListener('visibilitychange', handle);
    window.addEventListener('DOMContentLoaded', handle);
    window.addEventListener('resize', handle);
  },
  computed: mapGetters({
      sidebar: 'sidebar'
  }),
  methods: mapActions([
    'toggleDevice',
    'toggleSidebar'
  ])
}
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '~animate.css';
  @import '~bulma';
  $fa-font-path: '~font-awesome/fonts/';
  @import '~font-awesome/scss/font-awesome';

  .animated {
      animation-duration: .377s;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

</style>
