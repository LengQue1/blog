<template>
    <div class="content has-text-centered">
      <h1 class="is-title is-bold">{{route.name}}</h1>
      <hr/>
      <div class="columns">

        <div class="column is-three-quarters">
          <label class="label" >标题 Title</label>
          <p class="control">
            <input class="input" v-model="form.title" type="text" placeholder="Text Title">
          </p>
          <label class="label" >PathName</label>
          <p class="control">
            <input class="input" v-model="form.pathName" type="text" placeholder="添加前端路径后缀 Title">
          </p>
          <label class="label">Message</label>
          <div class="markedContainer">
            <markedEdit v-model="form.markdownContent"></markedEdit>
          </div>
        </div>

        <div class="column">
          <p class="control" >
            <label class="label" >选择分类</label>
            <span class="select">
              <select v-model="form.categoryId">
                <option value="">请选择分类</option>
                <option v-for="cate in categories" :value="cate.id" >{{ cate.name }}</option>
              </select>
            </span>
          </p>
          <p class="control">
            <label class="label" >选择标签</label>
            <span class="select">
              <select  @change="selectHandle($event)">
                <option value="">请选择标签</option>
                <option v-for="tag in tags" :value="tag.id" >{{ tag.name }}</option>
              </select>
            </span>
          </p>
          <p class="block" style="text-align: left">
            <span v-for="(value, index) in tagSelect" class="tag is-primary" style="margin:0 0.5em 10px 0;"><font><font>{{value.name}}</font></font><button @click="delTag(index)" class="delete is-small"></button></span>
          </p>
        </div>

      </div>

      <div class="control is-grouped">
        <p class="control">
          <button class="button is-primary" @click="onSubmit">提交</button>
        </p>
      </div>

    </div>
</template>

<script>

    import markedEdit from '../marked.vue'
    import markedown from 'marked'
    import moment from 'moment'

    export default {
        name: 'post',
        data () {
            const route = this.$route;
            let id = typeof this.$route.params.id === 'undefined' ? -1 : this.$route.params.id;
            let form = {
              markdownContent: '',
              categoryId: '',
            };
            return {route, form, id, categories: [], tags: [], tagSelect: [],}
        },

        components: { markedEdit },

        methods: {
          validate () {
            this.form.summary = markedown(this.form.markdownContent.split('<!--more-->')[0]);
            this.form.content = markedown(this.form.markdownContent.replace(/<!--more-->/g, ''));
            if (this.form.read_num === undefined ) {
              this.form.read_num = 0;
            }
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
          },
          selectHandle (e) {
            let option = e.target.options[e.target.options.selectedIndex];
            let obj = {
              categoryId: option.value,
              name: option.innerHTML
            };
            let pass = this.tagSelect.every((element,index,array) => {
              return element.name !== obj.name
            });
            if (obj.categoryId !== '' && pass) {
              this.tagSelect.push(obj);
            }
            e.target.options[0].selected = true;
          },
          delTag (index) {
            this.tagSelect.splice(index, 1);
          }
        },
        created() {
          if (this.id !== -1) {
              this.$store.dispatch('FETCH_BY_ID',{
                id: this.id,
                model: 'posts',
                params: {
                  where: {
                    id: this.id
                  }
                }
              }).then( post => {
                  this.form = post;
              });
          }

          let fetchTag = this.$store.dispatch('FETCH', {
            model: 'tags',
            params: {}
          });

          let fetchCategories = this.$store.dispatch('FETCH', {
            model: 'categories',
            params: {}
          });

          Promise.all([fetchCategories, fetchTag]).then(([cates, tags]) => {
            this.categories = cates.map(value => value);
            this.tags = tags.map(value => value);
          }).catch(err => console.log(err));

        },

    }
</script>

<style lang="scss" scoped>
    .markedContainer{text-align: left;}
</style>
