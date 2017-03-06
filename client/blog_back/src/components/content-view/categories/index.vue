<template>
  <div class="">
    <transition
      mode="out-in"
      enter-active-class="fadeIn"
      leave-active-class="fadeOut"
      appear>
      <router-view class="animated" :options="options"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        options: {
          name: 'categories',
          label: '分类',
          model: 'categories'
        }
      }
    }
  }
</script>

<style>

</style>
