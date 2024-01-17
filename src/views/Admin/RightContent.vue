
<template>
  <div class="admin-content-right">
    <right-filter @inform="receive"></right-filter>
    <right-homework :groupInfo="groupInfo"></right-homework>
    <!-- 筛选条件组件 -->
  </div>
</template>

<script setup>
// 导入进度条组件
// import RightProgressBar from './RightComponents/RightProgressBar.vue';
import RightFilter from './RightComponents/RightFilter.vue';
import RightHomework from './RightComponents/RightHomework.vue';

  const receive = (data)=>{
    console.log(data);
    let groupInfo = data;
    }
</script>

<style lang="less" scoped>
.admin-content-right {
  width: 27%;
  height: 94vh;
  // background-color: blue;
}
</style>
