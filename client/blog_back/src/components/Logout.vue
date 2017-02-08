<template>

</template>

<script>
  import Api from '../store/api'

  export default {
      methods: {
          logout () {
              Api.logout().then( response => {
                  sessionStorage.removeItem('token');
                  this.$message({
                      type: 'success',
                      message: '登出成功',
                  });
                  this.$router.push({ path: '/admin/login' });
                  this.$store.state.app.device.isLogin = false;
              })
          }
      },
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
