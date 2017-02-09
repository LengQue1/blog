<template>

</template>

<script>
  import Api from '../store/api'
  import { mapGetters } from 'vuex'
  export default {
      methods: {
          logout () {
              Api.logout().then( response => {
                  sessionStorage.removeItem('token');
                  sessionStorage.removeItem('username');
                  this.$message({
                      type: 'success',
                      message: '登出成功',
                  });
                  this.$router.push({ path: '/admin/login' });
                  this.device.isLogin = false;
                  this.user = {};
              })
          }
      },
      computed: mapGetters({
          user: 'users',
          device: 'device'
      }),
      watch: {
        '$route': function (route) {
          if (route.name === 'logout') {
            this.logout()
          }
        }
      },
      created () {
          this.logout();
      }
  }

</script>
