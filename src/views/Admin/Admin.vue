
<template>
  <div class="bg">
    <div class="content">
      <div class="flex-box">
        <left-info-bar></left-info-bar>
        <middle-content></middle-content>
        <right-content></right-content>
      </div>
    </div>
  </div>
</template>

<script setup>
import LeftInfoBar from './LeftInfoBar.vue';
import MiddleContent from './MiddleContent.vue';
import RightContent from './RightContent.vue';


</script>

<style lang="less" scoped>
.bg {
  position: relative;
  .body-size();
  //   background-image: url('../../assets/img/admin/bg.png');
  .bg-maker();
}
.content {
  width: 95vw;
  .to-center-ab();
  height: 96vh;
}
.flex-box {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  height: 100%;
}
</style>
