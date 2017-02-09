<template>
    <div class="content has-text-centered">
      <h1 class="is-title is-bold">{{route.name}}</h1>
        <label class="label">标题 Title</label>
        <p class="control">
          <input class="input" type="text" placeholder="Text Title">
        </p>
        <label class="label">Message</label>

         <div class="markedContainer">
           <marked v-model="markdownMessage"></marked>
         </div>

        <div class="control is-grouped">
          <p class="control">
            <button class="button is-primary">提交</button>
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

    export default {
        data () {
            const route = this.$route;
            const pkg = this.$store.state.pkg;
            const markdownMessage = 'Please enter here'
            return { pkg, route, markdownMessage }
        },
        components: { marked }
    }
</script>

<style lang="scss" scoped>
    .markedContainer{text-align: left;}
</style>
