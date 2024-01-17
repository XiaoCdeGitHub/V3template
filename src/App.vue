<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script lang="ts" setup></script>
<style>
@import url('./themes/default.css');

html {
  /* overflow: auto; */
}

html,
body,
#app {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
