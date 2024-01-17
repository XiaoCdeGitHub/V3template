<template>
  <div class="admin-content-left">
    <div class="work-publish">
      <span style="font-size: 16px">任务完成周期：</span>
      <div class="publish-top">
        <div class="date-picker">
          <el-date-picker
            v-model="value2"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator=" "
            start-placeholder="开始"
            end-placeholder="结束"
            align="right"
          >
          </el-date-picker>
        </div>
        <div class="group-checkbox">
          <el-select v-model="value1" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <span style="position: relative; top: 10px"> 作业详情：</span>
      <div class="week-checkbox">
        <el-select v-model="weekNumber" placeholder="请选择">
          <el-option
            v-for="item in weekOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <label class="input-file-button" for="upload"> 点击上传文件 </label>
      <span isshow="true" :style="{ color }" style="font-size: 14px; font-weight: 200">{{
        tip
      }}</span>
      <input type="file" id="upload" @change="getFile" />
      <textarea
        class="job-detail"
        placeholder="请输入备注内容"
        v-model="textarea"
        cols="34"
        rows="4"
      >
      </textarea>
      <button class="publish-button" @click="submitJob()">任务发布</button>
    </div>
  </div>
</template>

<script setup>
import { ChineseTransformGreenwich } from '../../utils/date';
import { weekToBeWorkName } from '../../utils/work';
import { directionOptionList, weekStageList } from '../../data/admin';
import {publicJobs,updateStatus,deleteUser} from '@/service/api/admin'
      const value1 = ref('')//方向选择值
      const textarea = ref('') //
      const value2 = ref('')//日期值
      const options = directionOptionList
      const weekNumber = ref('')
      const weekOptions = weekStageList
      const file = ref('')
      const tip = ref('未选择文件:文件类型为md或word')
      const color = ref('red')

   const getFile=(e)=>{
      const uploadFile = e.target.files[0];
      const fileType = uploadFile.name.split('.')[1];
      if (fileType === 'docx' || fileType === 'md' || fileType === 'doc') {
        file.value = uploadFile;
        tip.value = '上传文件:' + uploadFile.name;
        color.value = '#4a1691';
      } else {
        ElMessage.warning({ message: '请上传md或word格式的文件哦', showClose: true });
      }
    }
const submitJob = () => {
  if (!value2.value) {
    ElMessage.error('请先选择作业日期');

  }
  if (!value1.value) {
    ElMessage.error('请先选择方向');

  }
  if (!weekNumber.value) {
    ElMessage.error('请先选择适应期周数');
  }
  if (!file.value) {
    ElMessage.error('请先选择作业');
  }
  if (!textarea.value) {
    ElMessage.error('请先填写备注');
  }
}
let [start, stop] = value2.value;
console.log(start, stop);


if (start!==undefined && stop!==undefined) {
  const formatDate = (date) => {
  const res = `${date.getMonth()}月${date.getDate()}日  ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return res;
}
  let work = reactive({
    // name: `适应期第${weekToBeWorkName(this.weekNumber)}周作业`,
    file: file.value,
    startTime: formatDate(start),
    endTime: formatDate(stop),
    notice: textarea.value,
    direction: value1.value,
    weeks: weekNumber.value,
  });
  publicJobs(work).then((res) => {
        if (res.code === 200) {
          ElMessage.success('发布成功');
        } else {
          ElMessage.error('发布失败');
        }
      })
}


</script>

<style lang="less" scoped>
.job-detail {
  position: relative;
  top: 15px;
  border: #c2c7f4 solid 2px;
  background: #c2c7f4; //  背景透明
  border-radius: 5px;
  font-family: '黑体', Courier, monospace;
  display: inline-block;
  width: 100%;
}
.admin-content-left {
  width: 22%;
  height: 94vh;
  // background-color:blue;
  background-image: url('@/assets/img/admin/leftback.png');
  background-size: 100% 100%;
  border-radius: 20px;
  position: relative;
}

.work-publish {
  // background-color: red;
  height: 44vh;
  width: 80%;
  position: absolute;
  left: 30px;
  top: 15vh;
  opacity: 0.8;
}
.publish-top {
  // background-color: red;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.input-file-button {
  position: relative;
  // color: #4a1691;
  color: grey;
  background-color: #f0ecfc;
  background-image: linear-gradient(315deg, #f0ecfc 0%, #c2c7f4 74%);
  padding: 6px 25px;
  border-radius: 4px;
  cursor: pointer;
}

input {
  display: none;
}

.work-publish span {
  font-size: 16px;
  color: #4a1691;
  font-family: 黑体;
  line-height: 40px;
  font-weight: bold;
}
:deep(.el-date-editor) {
  --el-date-editor-datetimerange-width: 80%;
}
:deep(.el-input__wrapper) {
  --el-input-bg-color: #c2c7f4;
  // --el-border-radius-base: 8px;
}
:deep(.el-textarea) {
  --el-input-bg-color: #c2c7f4;
  --el-border-radius-base: 8px;
}
:deep(.el-textarea__inner) {
  --el-input-bg-color: #c2c7f4;
  --el-border-radius-base: 8px;
}
.publish-button {
  cursor: pointer;
  width: 100%;
  height: 5vh;
  margin-top: 30px;
  background-color: #f0ecfc;
  background-image: linear-gradient(315deg, #f0ecfc 0%, #c2c7f4 74%);
  line-height: 42px;
  border-radius: 8px;
  border: 0px;
  color: #4a1691;
  font-family: 黑体;
  line-height: 35px;
  font-weight: bold;
  font-size: 16px;
  transition: 0.5s;
}
.publish-button:hover {
  opacity: 0.8;
  transform: scale(0.9);
}
.group-checkbox {
  width: 100%;
}
.week-checkbox {
  position: relative;
  // top: -20px;
  width: 36%;
  margin-top: 15px;
  margin-bottom: 15px;
}
:deep(.el-select),
:deep(.el-input),
:deep(.el-input__inner) {
  background-color: #c1caf3;
  color: grey;
  border: 2px;
  border-radius: 30px;
  text-align: center;
}
//修改单个的选项的样式
:deep(.el-select-dropdown__item) {
  background-color: #c1caf3;
  color: #c1caf3;
}

//item选项的hover样式
:deep(.el-select-dropdown__item.hover),
:deep(.el-select-dropdown__item:hover) {
  color: #409eff;
}

//修改的是下拉框选项内容上方的尖角
/* /deep/ .el-popper .popper__arrow, .el-popper .popper__arrow::after{

  } */
:deep(.el-input) {
  --el-fill-color-blank: #c1caf3;
}
:deep(.el-popper) {
  --el-color-primary: #c1caf3;
}
</style>
