<template>

</template>

<script>
  import Api from '../store/api'

  export default {
      methods: {
          logout () {
              console.log(123);
              Api.logout().then( response => {
                  sessionStorage.removeItem('token');
                  this.$message({
                      type: 'success',
                      message: '登出成功',
                  });
                  this.$router.push({ path: '/admin/login' })
              })
          }
      },
      watch: {
        '$route': route => {
            console.log(route)
        }
      },
      created () {
          this.logout();
      }
  }

</script>
