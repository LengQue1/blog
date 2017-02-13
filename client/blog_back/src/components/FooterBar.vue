<template>

  <footer class="footer">
    <div class="container">
      <div class="content has-text-centered">
        <strong>{{pkg.description}}</strong>
        <p>
          Supports Vue {{pkg.dependencies.vue}} and Bulma {{pkg.dependencies.bulma}}!
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data () {
      const pkg = this.$store.state.pkg
      return {pkg}
    }
  }
</script>

<style lang="scss" scoped>
  .footer {background: #fff;width: 100%;padding-top: 30px;
    padding-right: 1.5rem;
    padding-bottom: 30px;
    padding-left: 180px;}
  @media screen and (max-width: 768px) {
    .footer {
      padding-left: 0;
    }
  }
</style>
