<template>
  <div id="app">
      <nprogress-container></nprogress-container>
      <Nav-bar :show="true"></Nav-bar>
      <Side-bar :show="sidebar.opened && !sidebar.hidden"></Side-bar>
      <app-main></app-main>
  </div>
</template>

<script>

import { NavBar, appMain, SideBar }  from './components'
import NprogressContainer from'vue-nprogress/src/NprogressContainer'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'app',
  components: {
    NprogressContainer,
    NavBar,
    SideBar,
    appMain
  },
  beforeMount () {
    const { body } = document;
    const WIDTH = 768;
    const RATIO = 3;
    const handle = () => {
      if (!document.hidden) {
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

<style lang="scss">
    @import '~animate.css';
    .animated {
        animation-duration: .377s;
    }

    @import '~bulma';


    $fa-font-path: '~font-awesome/fonts/';
    @import '~font-awesome/scss/font-awesome';

    .nprogress-container {
        position: fixed !important;
        width: 100%;
        height: 50px;
        z-index: 2048;
        pointer-events: none;

        #nprogress {
            $color: #48e79a;

            .bar {
                background: $color;
            }
            .peg {
                box-shadow: 0 0 10px $color, 0 0 5px $color;
            }

            .spinner-icon {
                border-top-color: $color;
                border-left-color: $color;
            }
        }
    }
</style>
