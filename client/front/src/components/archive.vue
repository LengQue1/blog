<template>
    <div id='main'>
        <div class="container">
            <article class="post archive">
                <h1 class=title>{{title}}</h1>
                <div class="entry-content" v-for="(item, key, index) in items">
                    <h3>{{ key }} ({{item.length}})</h3>
                    <ul>
                        <li v-for="subItem in item">
                            <router-link :to="{name: 'post', params: { pathName:subItem.pathName  }}" :title="subItem.title">{{subItem.title}}</router-link>&nbsp
                            <span class=date>{{ subItem.createdAt.split(' ')[0] }}</span>
                        </li>
                    </ul>
                </div>
            </article>
        </div>
    </div>
</template>

<script>


    export default {
        data () {
            return {
                title: '归档'
            }
        },
        computed: {
            items () {
                return this.$store.getters.archive
            }
        },
        preFetch (store, to, callback) {
            return store.dispatch('FETCH_ARCHIVE', {
                params: {
                    order: [
                        ['createdAt', 'DESC']
                    ]
                },
                callback
            })
        }
    }
</script>

<style>
    .archive{
        padding: 2em;
    }
</style>