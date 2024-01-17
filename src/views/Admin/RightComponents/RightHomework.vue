<template>
  <div id="download">
    <div class="title">
      作业下载<span>Download Homework</span>
      <span style="left: 65%" >完成/总人数：{{ getRate() }}</span>
    </div>
    <div id="checkbox">
      <ul>
        <li v-for="(item, index) in stufilterList" :key="index" ref="li">
          <div class="circle"></div>
          {{ item.name }}
          <!-- {{Hstage}} -->
          <input
            type="checkbox"
            value="false"
            v-model="item.isSelect"
            @click="checkEach()"
            ref="ck"
          />
          <a v-show="item.is_apply" :href="getDownloadHerf(item)" :download="getDownloadName(item)"
            >点击此处下载作业</a
          >
          <span v-show="!item.is_apply" class="not-finish">暂未完成</span>
        </li>
      </ul>
    </div>
    <div id="line">
      <button @click="Submit()">确定</button>
      <button @click="downloadExcel">下载报告</button>
      <div>
        全选<input type="checkbox" id="ckAll" v-model="isAll" ref="ckAll" @click="checkAll()" />
      </div>
    </div>
  </div>
</template>

<script setup>
import arrayToExcel from '../../../plugins/arrayToExcel/index';
import { loadFile } from '../../../utils/brower';
import { fuzzyStudents } from '@/service/api/admin'

const props = defineProps(['groupInfo'])
  // 筛选条件

      // stuList,
      // 符合条件的学生列表
      let stufilterList = reactive([])
      const url = ref('https://homework-hand-in.oss-cn-hangzhou.aliyuncs.com/')
      let studentsList = reactive([])
    //单选框
    const checkEach = ()=>{
      let count = 0;
      stufilterList.forEach((item) => {
        if (item.isSelect == true) {
          count++;
        }
      });
      if (count == stufilterList.length) {
        let _isSelected = document.getElementById('ckAll');
        _isSelected.checked = true;
      }
    }
    // 全选框
    const checkAll=()=> {
      stufilterList.forEach((item) => {
        if (item.isSelect == false) {
          item.isSelect = true;
        } else {
          item.isSelect = false;
        }
      });
    }
    const Submit= ()=> {
      // 获取被选中的学生姓名
      stufilterList.forEach((item) => {
        if (item.isSelect) {
          let url = getDownloadHerf(item);
          let name = getDownloadName(item);
          loadFile(url, name);
        }
      });
    }

    // 根据筛选条件获取符合条件的学生列表
    // 该函数由确定按钮统一执行
      const list= (stage, direction, group)=> {
      const params = {
        stage,
        group,
        direction,
      };
      console.log(params);
      fuzzyStudents(params).then((res) => {
        res = res.data;
        console.log(res);
        stufilterList = res.map((item) => {
          item.isSelect = false;
          item.curWork = item.work_list[item.work_list.length - 1] || {};
          return item;
        });
      });
    }
    const getDownloadHerf = (item)=> {
      if (item.curWork?.url_file_name) {
        return url.value + item.curWork.url_file_name;
      }
      return '';
    }
    const getDownloadName = (item)=>{
      if (item.curWork?.file_name) {
        return item.curWork.file_name;
      }
      return '';
    }
   const downloadExcel=()=> {
      if (stufilterList.length == 0) {
        ElMessage({ message: '暂时没有生成报告的数据哦', type: 'warning' });
      }
      let result = stufilterList.map((item) => {
        console.log(item);
        return {
          name: item.name,
          direction: item.direction,
          group: item.group,
          finish: item.is_apply ? '完成' : '未完成',
        };
      });
      let excel = new arrayToExcel({
        title: ['姓名', '方向', '小组', '是否完成'],
        column: result,
        filename: '适应期作业完成报告',
      });
      // excel.download();
      // console.log(111);
      console.log(groupInfo,666);
    }
const getRate = () => {
  let finished = stufilterList.filter((item) => {
        return item.is_apply;
      });
      return `${finished.length}/${stufilterList.length}`;
    }

</script>

<style lang="less" scoped>
/* 作业下载开始 */
#download {
  width: 100%;
  // background-color: red;
  // height: 40%;
  height: 50%;
}

/* 标题 */
#download .title {
  height: 40px;
  // background-color: red;
  font-size: 20px;
  line-height: 20px;
  font-weight: 700;
  position: relative;
  border-bottom: 3px solid #000;
}

/* 英文 */
#download .title span {
  font-size: 13px;
  color: #666666;
  position: absolute;
  font-weight: 400;
  left: 25%;
  top: 8px;
}

/* 学生列表 */
#checkbox {
  height: 74%;
  // background-color: pink;
}
#download ul {
  height: 100%;
  overflow-y: auto;
  // background-color: #c2c7f4;
}
/* 滚动条 */
#download ul::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 4px;
  /*高宽分别对应横竖滚动条的尺寸*/
  height: 20px;
  border-radius: 5px;
}

#download ul::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #7453e7;
}

#download ul::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  border-radius: 5px;
  background: #c2c7f4;
}
/* 滚动条结束 */
#checkbox ul li {
  height: 50px;
  font-weight: 700;
  line-height: 50px;
  position: relative;
  color: #666666;
  margin: 0 auto;
  display: flex;
  /* background-color: pink; */
}

/* 头像 */
#checkbox ul li .circle {
  display: inline-block;
  width: 35px;
  height: 35px;
  background-color: #fff;
  .bg-maker();
  background-image: url('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png');
  border-radius: 50%;
  box-shadow: 1px 1px 10px 1px #e2e1ed;
  margin-top: 5px;
  margin-left: 10px;
  margin-right: 15px;
}

/* 多选框 */
#checkbox ul li input[type='checkbox'] {
  appearance: none;
  width: 24px;
  height: 24px;
  font-size: 14px;
}
#checkbox ul li input[type='checkbox']::after {
  position: absolute;
  top: 0;
  color: #000;
  width: 20px;
  height: 20px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
}

#checkbox ul li input[type='checkbox']:checked::after {
  content: '✓';
  color: #130067;
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
}

/* 选择框 */
#download ul li input {
  width: 20px;
  height: 20px;
  position: absolute;
  right: 15px;
  top: 50%;
  margin-top: -10px;
  border: 2px solid #4a1691;
}

// 链接
li a {
  height: 50px;
  line-height: 50px;
  font-size: 10px;
  position: absolute;
  right: 60px;
  color: #4a1691;
  // display: none;
  // background-color: red;
}
.not-finish {
  position: absolute;
  right: 60px;
  color: rgb(143, 8, 8);
  height: 50px;
  line-height: 50px;
  font-size: 10px;
}
/* 最后一行 */
#download #line {
  width: 100%;
  height: 40px;
  // background-color: #666666;
}

/* 确认按钮 */
#download #line button {
  color: #fff;
  background-color: #130067;
  width: 30%;
  height: 40px;
  font-size: 20px;
  border-radius: 10px;
  margin-right: 20px;
}

/* 全选文字 */
#download #line div {
  color: #130067;
  width: 100px;
  height: 30px;
  font-size: 20px;
  line-height: 30px;
  font-size: 18px;
  font-weight: 700;
  display: inline-block;
  position: relative;
  right: -0%;
  // background-color: #202237;
}

/* 全选框 */
#line input {
  appearance: none;
  width: 24px;
  height: 24px;
  font-size: 14px;
  position: relative;
  left: 5px;
  top: 5px;
  border: 2px solid #4a1691;
}

#line input[type='checkbox']::after {
  position: absolute;
  top: 0;
  color: #000;
  width: 20px;
  height: 20px;
  display: inline-block;
  visibility: visible;
  padding-left: 0px;
  text-align: center;
}

#line input[type='checkbox']:checked::after {
  content: '✓';
  color: #130067;
  font-size: 15px;
  font-weight: bold;
  background-color: #fff;
}

/* 选择框 */
/* #download ul li input {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 50%;
    margin-top: -10px;
    border: 2px solid #4a1691;
}

/* 注释框 */
/* 这里把 none 里面的内容隐藏起来 */
/* .none {
    width: 150px;
    height: 100px;
    box-sizing: border-box;
    background-color: #6d4aed;
    opacity: 0.5;
    border: 1px solid #999;
    position: absolute;
    left: 190px;
    top: 15px;
    z-index: 3;
    display: none;
} */

/* .none::after {
    border-style: solid;
    border-width: 10px;
    border-color: transparent;
    height: 0px;
    border-left-color: #6d4aed;
    content: ' ';
    position: absolute;
    top: 0px;
    left: 100%;
} */

/* 这里设置li鼠标移过的时候，如果里面有none这个类，才会触发里面的样式 */
/*这里把 none 里面的内容显示出来*/
/* #download ul li:hover .none{
    display: block;
} */

/* 作业下载结束 */
</style>
