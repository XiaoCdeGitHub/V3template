<template>
  <div id="ProgressBar">
    <div class="title-name">第二周 本组进度</div>
    <div class="title-num">{{ stuFinishList.length }}/{{ stufilterList.length }}</div>
    <!-- 外边框 -->
    <div id="progress-container">
      <!-- 进度 -->
      <div id="progress-innner" ref="inner" :style="myStyle" @click="show()"></div>
    </div>
  </div>
</template>

<script>
defineProps: ['Hstage', 'Hdir', 'Hgroup']
      const stufilterList = reactive([{}])
      const stuFinishList = reactive([{}])
      const myStyle = reactive({
        width: '100%',
      })

</script>
<style>
#ProgressBar {
  width: 100%;
  height: 11%;
  font-size: 15px;
  /* margin-top: 30px; */
  /* background-color: yellow ; */
}
.title-name {
  width: 60%;
  position: relative;
  left: 10%;
  text-align: left;
  font-weight: 700;
  /* background-color: pink; */
}
.title-num {
  width: 30%;
  position: relative;
  left: 60%;
  text-align: right;
  /* background-color: red; */
}
#progress-container {
  width: 80%;
  height: 20px;
  border: 1px solid #202237;
  background-color: #202237;
  border-radius: 5px;
  margin: 0 auto;
}

/* 进度条内部 */
#progress-innner {
  width: 100%;
  height: 100%;
  background-color: #578bfc;
  border-radius: 5px;
}
</style>
