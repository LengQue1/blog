<template>
    <div id="main">
        <load :show="show"></load>
        <section id="page">
            <article-summary v-for="item in items" :article="item"></article-summary>
        </section>
    </div>
</template>

<script>
    import load from './load.vue';
    import articleSummary from './articleSummary.vue'
    export default {
        name: 'main',
        components: {
            load,
            articleSummary
        },
        computed: {
            show () {
                return this.$store.state.load
            },
            items() {
                return this.$store.getters.items
            }
        },
        preFetch (store, { path, query, params }, callback) {

            return store.dispatch('FETCH_ITEM', {
                params: {
                    'order': [
                        ['createdAt', 'DESC']
                    ],
                },
                callback
            })
        }
    }
</script>

<style lang="sass" scoped>

</style>