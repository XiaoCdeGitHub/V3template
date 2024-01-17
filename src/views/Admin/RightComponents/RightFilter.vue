<template>
  <div id="Filter">
    <div class="sift-word1">筛选条件</div>
    <div class="sift-word2">Filter</div>
    <div class="picture-computer"></div>
    <button @click="Submit()">确定</button>
    <!-- 阶段 -->
    <div>
      <div class="stage">
        <span @click="Sshow(SisShow)">{{ stageName || '阶段' }}⌵</span>
        <ul v-show="SisShow == true">
          <li v-for="(stage, index) in stageList" :key="index" @click="selectStage(index)">
            {{ stage.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 方向 -->
    <div>
      <div class="Direction">
        <span @click="Dshow(DisShow)">{{ dir }}⌵</span>
        <ul v-show="DisShow">
          <li v-for="(dir, index) in directionList" :key="index" @click="selectDirection(index)">
            {{ dir.name }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 组 -->
    <div>
      <div class="group">
        <span @click="Gshow(GisShow)">{{ group }}⌵</span>
        <ul v-show="GisShow">
          <li v-for="(group, index) in groupList" :key="index" @click="selectGroup(index)">
            {{ group.name }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import {getFilter} from '@/service/api/admin'

import { groupList, directionList, stageList } from '../../../data/admin';
      const index = ref(0)
      const SisShow = ref(false)
      const  DisShow = ref(false)
      const  GisShow = ref(false)
      const stage = ref('阶段')
      const dir = ref('方向')
      const group =  ref('组别')
      // 获取选中的内容
      const stageName = ref('')
      const directionName = ref('')
      const groupName =  ref('')

    const Sshow = () => {
      SisShow.value = !SisShow.value;
    }
    const Dshow = () =>{
    DisShow.value = !DisShow.value;
    }
    const Gshow = () => {
    GisShow.value = !GisShow.value;
    }
    const selectStage = (index)=> {
      (stageName.value = stageList[index].name),
        (stage.value = stageList[index].value),
        (SisShow.value = !SisShow.value);
      // console.log(this.stage);
      // (提交请求)
      // this.$emit('Scommit',this.stage);
      // 跨组件操作筛选函数
      // this.$emit('save');
    }
    const selectDirection = (index)=> {
      (directionName.value = directionList[index].name),
        (dir.value = directionList[index].name),
        (DisShow.value = !DisShow.value);
      // console.log(this.dir);
      // (提交请求)
      // this.$emit('Dcommit',this.dir);
      // 跨组件操作筛选函数
      // this.$emit('save');
    }
   const selectGroup = (index)=> {
      (groupName.value = groupList[index].name),
        (group.value = groupList[index].name),
        (GisShow.value = !GisShow.value);
    }
    // 原提交按钮
    // 执行学生列表的筛选和进度条展示函数
   const Submit=()=> {
      if (stage === '阶段') {
        ElMessage({ message: '请选择阶段', type: 'warning' });
        return;
      }
      if (dir === '方向') {
        ElMessage({ message: '请选择方向', type: 'warning' });
        return;
      }
      if (group === '组别') {
        ElMessage({ message: '请选择组别', type: 'warning' });
        return;
      }
      const filterParams = {
        weeks: stage.value,
        group: group.value,
        direction: dir.value,
      };
     console.log('filterParams',filterParams);

     const emit = defineEmits(['groupInfo'])
     const emitInfo = () => {
      emit('groupInfo','1111')
     }
      // getFilter(filterParams).then((res) => {
      //   console.log(res,'查找后的数据');
      //   //将数据存放到pinia
      //   this.$store.commit('moudlesUserInfo/setGroupInfo', res.data);
      //   // this.$emit('inform','1111')
      // });
    }
</script>

<style scoped>
/* 筛选条件开始 */
#Filter {
  width: 100%;
  height: 48%;
  cursor: default;
}

/* 筛选条件中文 */
.sift-word1 {
  display: inline-block;
  width: 100%;
  height: 20px;
  /* background-color: palegreen; */
  font-size: 15px;
  font-weight: 700;
  color: #333333;
  position: relative;
  top: 10%;
}
/* 筛选条件英文 */
.sift-word2 {
  display: inline-block;
  width: 100%;
  height: 20px;
  /* background-color: palegreen; */
  font-size: 15px;
  color: #666666;
  position: relative;
  top: 11%;
}

.picture-computer {
  display: inline-block;
  /* background-color: red; */
  display: inline-block;
  width: 120px;
  height: 120px;
  background-image: url(@/assets/img/admin/computer.png);
  background-repeat: no-repeat;
  position: relative;
  left: 80%;
  top: -10%;
}

li {
  list-style: none;
}
/* 阶段 */
.stage {
  display: inline-block;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  font-size: 25px;
  color: #fff;
  background-image: linear-gradient(to bottom, #8156d9, #6450f9);
  border-radius: 50%;
  position: absolute;
  top: 8%;
  /* top: 15%; */
  left: 82%;
  border: none;
}

.stage ul li {
  background-color: #c2c7f4;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  color: #000;
  border-radius: 10px;
  position: relative;
  z-index: 9999;
  opacity: 0.8;
}

.stage ul li:hover {
  background-color: #333333;
  color: #fff;
}
/* 方向 */
.Direction {
  width: 100px;
  height: 100px;
  line-height: 100px;
  font-size: 20px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(to bottom right, #8473ed, #d776b8);
  border-radius: 50%;
  border: none;
  position: absolute;
  top: 30%;
  /* top: 38%; */
  left: 78%;
}

.Direction ul li {
  background-color: #e8b8e5;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  color: #000;
  border-radius: 10px;
  z-index: 9999;
  position: relative;
  left: -50px;
  opacity: 0.8;
}
.Direction ul li:hover {
  background-color: #333333;
  color: #fff;
}
/* 组 */
.group {
  width: 130px;
  height: 130px;
  border-radius: 50%;
  font-size: 25px;
  text-align: center;
  line-height: 130px;
  border: none;
  color: #fff;
  background-image: linear-gradient(to bottom, #e24777, #f17770);
  position: absolute;
  top: 30%;
  /* top: 38%; */
  left: 88%;
}

.group ul li {
  background-color: #e8b0a6;
  width: 150px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 20px;
  color: #000;
  border-radius: 10px;
  position: relative;
  z-index: 9999;
  opacity: 0.8;
}

.group ul li:hover {
  background-color: #333333;
  color: #fff;
}

/* 按钮 */
#Filter button {
  width: 50px;
  height: 50px;
  background-color: #9d93be;
  color: #fff;
  border: none;
  font-size: 17px;
  border-radius: 50%;
  position: relative;
  top: 3%;
  left: 50%;
}

/* 筛选条件结束 */
</style>
