<template>
    <div id='main'>
        <div class="container">
            <article class="post archive">
                <h1 class=title>{{title}}</h1>
                <div class="entry-content" v-for="(item, key, index) in items">
                    <div class="archive_title">
                        <h3>{{ key }} ({{item.length}})</h3>
                    </div>
                    <ul>
                        <li v-for="subItem in item" class="subItem">
                            <router-link class="Shining" :to="{name: 'post', params: { pathName:subItem.pathName  }}" :title="subItem.title" >{{subItem.title}}</router-link>&nbsp
                            <span class='date' style=" font-size: 12px;">{{ subItem.createdAt.split(' ')[0] }}</span>
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
        metaInfo() {
          return {
            title: this.title
          }
        },
        computed: {
            items () {
                return this.$store.getters.archive
            }
        },
        preFetch (store, to, callback) {
            return store.dispatch('FETCH_ARCHIVE', {
                model: 'posts',
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
    .entry-content{
        position: relative;
    }
    .entry-content::after {
        content: '';
        top: 20px;
        left: 0;
        margin-left: -2px;
        width: 4px;
        height: 100%;
        background: #f5f5f5;
        z-index: -1;
        position: absolute;
    }
    .archive{
        padding: 2em;
    }
    .archive .subItem {
        margin: 0.5em 0;
        position: relative;
    }
    .archive .subItem::before {
        content: " ";
        position: absolute;
        left: -25px;
        top: 12px;
        width: 8px;
        height: 8px;
        margin-left: -4px;
        background: #bbb;
        border-radius: 50%;
        border: 1px solid #fff;
    }
    .archive_title {
        position: relative;
    }
    .archive_title h3 {margin-left: 20px;}
    .archive_title::before {
        content: " ";
        position: absolute;
        left: 0;
        top: 50%;
        margin-left: -4px;
        margin-top: -4px;
        width: 8px;
        height: 8px;
        background: #bbb;
        border-radius: 50%;
    }
</style>