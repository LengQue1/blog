<template>
    <div class="content has-text-centered">
        <p>
            <img width="100" src="~assets/logo.png" :alt="pkg.description" />
        </p>

        <h1 class="is-title is-bold">{{ pkg.name.replace('-', ' ') }}</h1>

        <p>
            <strong>{{ pkg.description }}</strong>
            <a >Live Demo</a>
        </p>


    </div>
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
    .is-title {
        text-transform: capitalize;
    }
</style>
