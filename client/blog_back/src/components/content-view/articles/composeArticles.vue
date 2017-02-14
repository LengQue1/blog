<template>
    <div class="content has-text-centered">
      <h1 class="is-title is-bold">{{route.name}}</h1>
        <label class="label" >标题 Title</label>
        <p class="control">
          <input class="input" v-model="form.title" type="text" placeholder="Text Title">
        </p>
        <label class="label">Message</label>

         <div class="markedContainer">
           <marked v-model="form.markdownContent"></marked>
         </div>

        <div class="control is-grouped">
          <p class="control">
            <button class="button is-primary" @click="onSubmit">提交</button>
          </p>
        </div>
    </div>
</template>

<script>

    import marked from '../marked.vue'
    import markedown from 'marked'
    import moment from 'moment'

    export default {
        data () {
            const route = this.$route;
            let id = typeof this.$route.params.id === 'undefined' ? -1 : this.$route.params.id;
            let form = {};
            return {route, form, id }
        },

        components: { marked },

        methods: {
            validate () {
              this.form.summary = markedown(this.form.markdownContent.split('<!--more-->')[0]);
              this.form.content = markedown(this.form.markdownContent.replace(/<!--more-->/g, ''));
              this.form.category = '未分类';
              this.form.read_num = 0;
            },
            onSubmit () {
                this.validate();
                this.$store.dispatch('POST', {
                    model: 'posts',
                    form: this.form
                }).then(response => {
                    if (response.status == 'fail') {
                      this.$message({
                        type: 'error',
                        message: '文章提交失败!'
                      })
                    } else {
                      this.$message({
                        type: 'success',
                        message: '文章提交成功!'
                      });
                      this.$router.push({ path: '/post/allPost'})
                    }

                })
            }
        },

        created() {
            if (this.id !== -1) {
                console.log(this.id)
                this.$store.dispatch('FETCH_BY_ID',{
                  id: this.id,
                  model: 'posts',
                  params: {
                      id: this.id
                  }
                }).then( post => {
//                    this.form = post;
                    this.form.title = post.title;
                    this.form.content = post.content;
                    this.form.category = post.category;
                    this.form.read_num = post.read_num;
                    this.form.markdownContent = post.markdownContent;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .markedContainer{text-align: left;}
</style>
