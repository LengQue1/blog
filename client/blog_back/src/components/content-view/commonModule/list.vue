<template>
  <div class="content has-text-centered">
    <h1 class="is-title is-bold">{{route.name}}</h1>
    <table class="table is-striped"　style="margin-top: 2em;">
      <thead>
      <tr>
        <th><abbr title="Position">Pos</abbr></th>
        <th><abbr :title="options.label">{{ options.label }}</abbr></th>
        <th><abbr title="操作">操作</abbr></th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(li, index) in list">
        <th>{{ index }}</th>
        <td><a >{{ li.name }}</a></td>
        <td>
          <a @click ="delHandle(li.id, index)" class="button is-danger  is-small" title="删除">删除</a>
          <a @click ="editHandle(li.id)" class="button is-primary  is-small" title="编辑">编辑</a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    data () {
      const route = this.$route;
      return { route }
    },
    props: ['options'],
    computed: {
      ...mapGetters(['list'])
    },
    methods: {
      editHandle (_id) {
        this.$router.push({
          path: `/${this.options.name}/create/${_id}`
        });
      },
      delHandle (id, index) {
        this.$store.dispatch('DELETE_BY_ID',{
          id: id,
          model: this.options.model
        }).then(response => {
          if (response.status === 'success') {
            this.$message({
              type: 'success',
              message: '删除成功'
            });
            this.list.splice(index, 1);
          } else if (response.status === 'fail') {
            this.$message({
              type: 'error',
              message: response.error
            });
          }
        })
      },
    },
    created () {
      this.$store.dispatch('FETCH_LIST', {
        model: this.options.model,
        params: {
          order: [
            ['createdAt', 'DESC']
          ]
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

</style>
