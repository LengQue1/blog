<template>
    <div class="content has-text-centered">


        <h1 class="is-title is-bold">{{route.name}}</h1>

        <p>
            <strong>{{pkg.description}}</strong>

        </p>

        <p>Supports Vue {{pkg.dependencies.vue}} and Bulma {{pkg.dependencies.bulma}}!</p>
    </div>
</template>

<script>
    export default {
        data () {
            const route = this.$route
            const pkg = this.$store.state.pkg
            return {pkg, route}
        }
    }
</script>

<style lang="scss" scoped>

</style>
