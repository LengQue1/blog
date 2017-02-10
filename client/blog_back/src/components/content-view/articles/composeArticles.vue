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
        <p>
            <strong>{{pkg.description}}</strong>
        </p>
        <p>Supports Vue {{pkg.dependencies.vue}} and Bulma {{pkg.dependencies.bulma}}!</p>
    </div>
</template>

<script>

    import marked from '../marked.vue'
    import markedown from 'marked'

    export default {
        data () {
            const route = this.$route;
            const pkg = this.$store.state.pkg;
            let form = {};
            return { pkg, route, form }
        },

        components: { marked },

        methods: {
            validate () {
              this.form.content = 'saajokfkf'
              this.form.user_id = 1
              this.form.category = '未分类'
              this.form.summary = '什么是摘要'
            },
            onSubmit () {
                this.validate();
                console.log(this.form)
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
                      })
                    }

                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .markedContainer{text-align: left;}
</style>
