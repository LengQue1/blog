<template>
    <div id="app" class="main-content">
        <h1>Vue.js SSR</h1>
        <router-view></router-view>
    </div>
</template>

<style>

    .main-content h1{
        display: flex;
        justify-content: center;
    }
    .main-content main{
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>