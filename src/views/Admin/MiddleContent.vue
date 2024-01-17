<template>
  <div class="admin-content-middle">
    <div class="middle-header">
      <div class="top-left-part">
        <div class="morning-user">
          <div class="user-photo">
            <img src="https://cd-mapbed.oss-cn-beijing.aliyuncs.com/preview.gif" alt="" />
          </div>
          <p :userName="userName">早上好，{{ userName }}!</p>
        </div>
        <div class="fly1">
          <img src="" alt="" />
        </div>
      </div>
      <div class="human-photos">
        <img src="@/assets/img/admin/p1.png" alt="" />
        <img src="@/assets/img/admin/p2.png" alt="" />
        <img src="@/assets/img/admin/p3.png" alt="" />
        <img src="@/assets/img/admin/p4.png" alt="" />
      </div>
    </div>
    <p class="tip-title">用户注册申请&nbsp;&nbsp;<span>User Registration Application</span></p>
    <div class="middle-body">
      <div class="body-header">
        <div class="search-box-part">
          <div id="cover">
            <div class="tb">
              <div class="td">
                <input type="text" placeholder="name" v-model="applyName" required />
              </div>
              <div class="td" id="s-cover">
                <button type="text" @click="applySearch()">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="group-checkbox">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
        <img class="hand-img" src="@/assets/img/admin/hand.png" alt="" />
      </div>

      <div class="application-list">
        <div class="application" :class="{ application_selected: chooseApplyValue.indexOf(item.id) != -1 }"
          v-for="(item, index) in applyUserListShow" :key="index" @click="clickApplyItem(item.user_name, item.id)">
          <div class="application-icon">
            <!-- src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" -->
            <!-- 获取qq头像 -->
            <el-avatar src="https://cd-mapbed.oss-cn-beijing.aliyuncs.com/preview.gif"></el-avatar>
            <!-- <el-avatar :src="`https://q1.qlogo.cn/g?b=qq&nk=${item.qqnum}&s=4`"></el-avatar> -->
          </div>
          <p style="margin-left: 3px; font-size: 13px">{{ item.user_name + '-' + item.group_name }}</p>
        </div>
      </div>
      <div class="mbody-footer">
        <div class="all-check-button">
          <el-tooltip effect="dark" content="点击以全选用户" placement="right">
            <input type="checkbox" name="" id="check_box" @change="changeApplyChecked()" v-model="applyChecked" /></el-tooltip>
        </div>
        <el-button class="check-button" text @click="clickToApply()">
          <el-tooltip effect="dark" content="选中用户并点击此处提交" placement="right">✔</el-tooltip>
        </el-button>
      </div>
    </div>
    <p class="tip-title">删除用户&nbsp;&nbsp;<span>Delete user</span></p>
    <div class="middle-footer">
      <img class="fly2-1" src="@/assets/img/admin/fly2.png" alt="" />
      <div class="body-header">
        <div class="search-box-part">
          <div id="cover">
            <div class="tb">
              <div class="td">
                <input type="text" placeholder="name" v-model="deleteName" required />
              </div>
              <div class="td" id="s-cover">
                <button type="submit" @click="deleteSearch()">
                  <div id="s-circle"></div>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="group-checkbox">
          <el-select v-model="value2" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="application-list">
        <div class="delete_application"
          :class="{ delete_application_selected: chooseDeleteValue.indexOf(item.id) != -1 }"
          v-for="(item, index) in deleteUserListShow" :key="index" @click="clickDeleteItem(item.user_name, item.id)">
          <div class="application-icon">
            <img src="https://cd-mapbed.oss-cn-beijing.aliyuncs.com/2.jpg" alt="" />
          </div>
          <div class="message-box">
            <!-- <p>开发</p> -->
            <p style="font-size: 15px">{{ deleteUserListShow[index].direction }}</p>

            <p style="font-size: 15px">{{ item.user_name }}</p>
          </div>
          <!-- <div class="group-message" style="margin-top: 5px;">适应期成员</div> -->
        </div>
      </div>
      <div class="mbody-footer">
        <div class="all-check-button">
          <el-tooltip effect="dark" content="点击以全选用户" placement="right">
            <input type="checkbox" name="" id="check_box" @change="changeDeleteChecked()"
              v-model="deleteChecked" /></el-tooltip>
        </div>
        <el-button class="check-button" text @click="clickToDelete()">
          <el-tooltip effect="dark" content="选中用户并点击此处提交" placement="right">✔</el-tooltip>
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { directionOptionList } from '../../data/admin';
import { publicJobs, getUserData, updateStatus, deleteUser } from '@/service/api/admin'
const allUserList = ref([])
const applyUserList = ref([])//所有注册待通过用户列表
const applyUserListShow = ref([])
const deleteUserList = ref([])//所有已注册用户列表
const deleteUserListShow = ref([])
const chooseApplyValue = ref([])//待通过已选中的id
const applyChecked = ref(false)
const deleteChecked = ref(false)
const chooseDeleteValue = ref([])//待删除已选中的id
const options = directionOptionList
const value1 = ref('')//待通过列表筛选条件
const value2 = ref('')//待删除列表筛选条件
const userName = ref('云子')
const applyName = ref('') //待通过列表搜索内容
const deleteName = ref('') //待删除列表搜索内容

//获取全部学生信息
getUserData().then((res) => {
  console.log(res.data);
  allUserList.value = res.data;
  // console.log('allUserList', allUserList);

  //通过is_active参数区分是待通过用户还是已通过用户
  applyUserList.value = allUserList.value.filter((item) => {
    return item.is_active === 0;
  })
  console.log(applyUserList.value);
  //先通过监听value值来区分方向
  //默认情况
  applyUserListShow.value = applyUserList.value
  watch(value1, (newVal) => {
    applyUserListShow.value = applyUserList.value.filter(item => item.group_name === newVal);
    console.log('applyUserListShow.value', applyUserListShow.value);
  });

  deleteUserList.value = allUserList.value.filter((item) => {
    return item.is_active === 1;
  })
  //默认情况
  deleteUserListShow.value = deleteUserList.value
  watch(value2, (newVal) => {
    deleteUserListShow.value = deleteUserList.value.filter(item => item.group_name === newVal);
    console.log('deleteUserListShow.value', deleteUserListShow.value);
  });
  console.log(allUserList.value);
});


// const selectedIndices = ref([]);
// // 检查项是否被选中
// const isSelected = (index) => {
//   return selectedIndices.value.includes(index);
// }
//   const selectAll = ref(false);
// const toggleSelection = (index) => {
//   if (selectedIndices.value.includes(index)) {
//     selectedIndices.value = selectedIndices.value.filter(i => i !== index); // 取消选中
//     console.log('通过点击单选破坏全选条件');
//     selectAll.value = false;
//   } else {
//     selectedIndices.value.push(index); // 选中
//     console.log('点击单选按钮');
//     console.log('selectedIndices.value', selectedIndices.value);
//     if (selectedIndices.value.length === applyUserListShow.value.length) {
//       console.log('通过点击单选得到全选');
//       selectAll.value = true;
//       toggleSelectAll
//       console.log(selectAll.value);
//     } else {
//       console.log('通过点击单选破坏全选条件');
//       selectAll.value = false;
//       toggleSelectAll
//     }
//   }
// console.log('selectAll.value',selectAll.value);
// }
// // 根据全选状态更新选中项数组
// const toggleSelectAll = () => {
//   console.log('点击全选按钮');
//     //此时是全选状态，点击后需要不全选
//     if (selectAll.value) {
//       selectedIndices.value = [];
//     } else {
//       selectedIndices.value = [];
//       for (let index = 0; index < applyUserListShow.value.length; index++) {
//         toggleSelection(index);
// }
//       }
//     };

//     // 根据选中项数组和总项数计算全选状态
//     const isAllSelected = computed(() => {
//       return selectedIndices.value.length === applyUserListShow.value.length;
//     });




/*
1.分页功能
2.全选功能
3.查找功能

*/


// const applySearch = () => {
//   // ElMessage.warning('功能暂未开放');
//   // return;
//   if (applyName.value == '') {
//     ElMessage.error('请输入查询内容');
//     // this.applyUserList= allUserList;
//     // window.location.reload();
//     return;
//   } else {
//     console.log(applyName.value);
//     applyUserListShow = [];
//     let searchWord = {
//       word: applyName.value,
//     };

//     getSearchList(searchWord).then((res) => {
//       res = res.data;
//       for (let index = 0; index < res.length; index++) {
//         if (res[index].is_active == true) {
//           ElMessage.warning('该用户已经通过申请');
//         } else if (res[index].is_active == false) {
//           applyUserListShow = res;
//           if (index == res.length - 1) {
//             ElMessage.success('查询成功');
//             return;
//           }
//         }
//       }
//       if (res.length == 0) {
//         ElMessage.error('未查询到该用户');
//       }
//     }).catch((error) => {
//   ElMessage.error(error);
// });;
//   }
// }
// const deleteSearch = () => {
//   // this.$message.warning('功能暂未开放');
//   // return;
//   if (deleteName.value == '') {
//   ElMessage.error('请输入查询内容');
//     // this.applyUserList= allUserList;
//     window.location.reload();
//     return;
//   } else {
//     deleteUserListShow = [];
//     let searchWord = {
//       word: deleteName.value,
//     };

//     console.log(searchWord);
//     getSearchList(searchWord).then((res) => {
//       res = res.data;
//       for (let index = 0; index < res.length; index++) {
//         if (res[index].is_active == false) {
//           ElMessage.warning('该用户还未通过申请');
//         } else if (res[index].is_active == true) {
//           deleteUserListShow = res;
//           if (index == res.length - 1) {
//             ElMessage.success('查询成功');
//             return;
//           }
//         }
//       }
//       if (res.length == 0) {
//         ElMessage.error('未查询到该用户');
//       }

//       //  ;
//     }).catch((error) => {
//   ElMessage.error(error);
// });;
//   }
// }
//添加用户小选框
const clickApplyItem = (name, id) => {
  if (chooseApplyValue.value.indexOf(id) != -1) {
    chooseApplyValue.value.splice(chooseApplyValue.value.indexOf(id), 1);
  } else {
    chooseApplyValue.value.push(id);
  }
  if (chooseApplyValue.value.length == applyUserList.value.length) {
    applyChecked.value = true;
  } else {
    applyChecked.value = false;
  }
}
//添加用户大选框
const changeApplyChecked = () => {
  if (applyChecked.value) {
    chooseApplyValue.value = [];
    for (let index = 0; index < applyUserList.value.length; index++) {
      chooseApplyValue.value.push(applyUserList.value[index].id);
    }
    // this.chooseApplyValue= allUserList
  } else {
    chooseApplyValue.value = [];
  }
}

// //通过申请
// const clickToApply = () => {
//   if (chooseApplyValue.length === 0) {
//     ElMessage.warning('请选择要通过的用户!');
//     return;
//   }
//   //更新页面
//   for (let index = 0; index < chooseApplyValue.length; index++) {
//     // this.chooseApplyValue[index].is_active=1
//     let applyOne = chooseApplyValue[index];
//     for (let index = 0; index < applyUserList.length; index++) {
//       if (applyUserList[index].userId.indexOf(applyOne) != -1) {
//         applyUserList[index].status = 1;
//         //给后端传递值 更改用户状态
//         // console.log("已通过");
//         //前端本地更改
//         deleteUserListShow.push(applyUserList[index]);
//         applyUserListShow.splice(index, 1);
//       }
//     }
//   }
//   console.log(chooseApplyValue);
//   const arr = chooseApplyValue.map((id) => {
//     return 'userList=' + id;
//   });
//   const paramsString = arr.join('&');
//   const searchParams = new URLSearchParams(paramsString);

//   //发送要通过的id
//   updateStatus(searchParams).then((res) => {
//     if (res.code === 200) {
//       ElMessage.success('通过成功');
//       chooseApplyValue = [];
//       applyChecked.value = false;
//     }
//   }).catch((error) => {
//   ElMessage.error(error);
// });;
// }
// //删除用户

// const clickToDelete = () => {
//   if (chooseDeleteValue.length === 0) {
//     ElMessage.warning('请选择要删除的用户!');
//     return;
//   }
//   for (let index = 0; index < chooseDeleteValue.length; index++) {
//     let deleteOne = chooseDeleteValue[index];
//     for (let index = 0; index < deleteUserList.length; index++) {
//       if (deleteUserList[index].userId.indexOf(deleteOne) != -1) {
//         ElMessageBox.confirm(
//     '你是否决定对‘' + deleteUserList[index].name + '’永远说再见',
//     '提示',
//     {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning',
//     }
//   ).then(() => {
//             //前端本地更改
//             // this.deleteUserList[index].is_active = 0;
//             let deleteChange = deleteUserList[index].userId;
//             console.log('我是id', that.deleteUserList[index].userId);
//             const data = { userList: deleteChange };
//             deleteUser(data).then((res) => {
//               if (res.code === 200) {
//                 that.deleteUserListShow.splice(index, 1);
//                 ElMessage({
//                   type: 'success',
//                   message: '删除成功!',
//                 });
//               }
//             });
//           })
//           .catch(() => {
//             ElMessage({
//               type: 'info',
//               message: '已取消删除',
//             });
//           });
//       }
//     }
//   }
//   chooseDeleteValue = [];
//   deleteChecked.value = false;

//   // console.log(this.deleteUserList);
// }

//删除用户小选框
const clickDeleteItem = (name, id) => {
  if (chooseDeleteValue.value.indexOf(id) != -1) {
    chooseDeleteValue.value.splice(chooseDeleteValue.value.indexOf(id), 1);
  } else {
    chooseDeleteValue.value.push(id);
  }
  if (chooseDeleteValue.value.length == deleteUserList.value.length) {
    deleteChecked.value = true;
  } else {
    deleteChecked.value = false;
  }
}
//删除用户大选框
const changeDeleteChecked = () => {
  if (deleteChecked.value) {
    for (let index = 0; index < deleteUserList.value.length; index++) {
      chooseDeleteValue.value.push(deleteUserList.value[index].id);
    }
    // this.chooseApplyValue= allUserList
  } else {
    chooseDeleteValue.value = [];
  }
  console.log(chooseDeleteValue.value);
}

</script>

<style lang="less" scoped>
.admin-content-middle {
  position: relative;
  width: 46%;
  height: 94vh;
  // background-color:blue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}

.middle-header {
  position: relative;
  width: 100%;
  height: 14vh;
  // background-color: red;
  display: flex;
  justify-content: center;
  flex-direction: row;

  .user-photo {
    position: relative;
    left: -20px;

    img {
      width: 50px;
      height: 50px;
      border-radius: 100px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2), 0 0 8px rgba(0, 0, 0, 0.1);
    }
  }
}

.middle-body {
  position: relative;
  top: -10px;
  width: 98%;
  height: 32vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #f1f0f5;
  border-radius: 20px;
  box-shadow: #7d70a9 0px 0px 10px;
}

.middle-footer {
  position: relative;
  top: -10px;
  width: 98%;
  height: 33vh;
  margin-left: auto;
  margin-right: auto;
  background-color: #f1f0f5;
  border-radius: 20px;
  box-shadow: #7d70a9 0px 0px 10px;
  position: relative;
}

.top-left-part {
  width: 40%;
  height: 100%;
  //  background-color: antiquewhite;
  display: flex;
  flex-direction: column;
}

.morning-user {
  width: 80%;
  height: 6vh;
  // background-color: red;
  display: flex;
  //  justify-content: center;
  flex-direction: row;
  margin-left: 24px;
  margin-top: 8px;

  p {
    font-size: 20px;
    margin-top: 10px;
    margin-left: 5px;
    font-weight: bolder;
  }

  // background-color: purple;
}

.fly1 {
  position: absolute;
  left: 100px;
  top: 35px;
  width: 200px;
  height: 70px;
  background: url('@/assets/img/admin/fly1.png');
  background-size: 100% 100%;
}

.human-photos {
  position: relative;
  left: 90px;
  width: 60%;
  display: flex;
  margin-top: 0;
  text-align: right;

  img {
    transform: scale(0.9);
  }

  // overflow: auto;
}

.tip-title {
  position: relative;
  top: -10px;
  font-family: 黑体;
  font-size: 18px;
  line-height: 20px;
  font-weight: bolder;

  span {
    font-size: 16px;
    opacity: 0.8;
  }
}

.body-header {
  width: 100%;
  height: 10vh;
  // background-color: purple;
  margin-top: -10px;
  padding: 1px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
}

.group-checkbox {
  width: 100px;
  margin-right: 30px;
  margin-top: 30px;
}

/* .checkbox-left {
  position: relative;
  left: -300px;
} */
.hand-img {
  width: 80px;
  height: 40px;
  position: absolute;
  right: 0;
  top: -30px;
}

:deep(.el-select),
:deep(.el-input),
:deep(.el-input__inner) {
  background-color: #c1caf3;
  color: #a8abb2;
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

.search-box-part {
  position: relative;
  top: 10px;
  left: 40px;
  width: 250px;
  height: 60px;
  background-color: #f1f0f5;

  input {
    position: relative;
    top: -17px;
  }

  input,
  button {
    color: #fff;
    font-family: Nunito;
    padding: 0;
    margin: 0;
    border: 0;
    background-color: transparent;
  }
}

.tb {
  display: table;
  width: 100%;
  margin-top: auto;
  margin-bottom: auto;
}

.td {
  display: table-cell;
  vertical-align: middle;
}

#cover {
  width: 100%;
  height: 100%;
  margin-left: -60px;
  background-color: #f1f0f5;
  border-radius: 20px;
  border: 4px solid #7c40d8;
  box-shadow: 0 0 4px #7c40d8;
  transform: scale(0.6);
}

form {
  height: 80px;
}

input[type='text'] {
  width: 100%;
  height: 80px;
  font-size: 30px;
  color: #7c40d8;
  line-height: 80px;
  margin-top: -10px;
  padding-left: 20px;

  // background-color: pink;
}

input[type='text']::placeholder {
  color: #7c40d8;
}

#s-cover {
  width: 1px;
  padding-left: 35px;

  button {
    position: relative;
    display: block;
    width: 84px;
    height: 96px;
    cursor: pointer;
  }
}

#s-circle {
  position: relative;
  top: -28px;
  left: 20px;
  width: 30px;
  height: 30px;
  margin-top: 0;
  border: 4px solid #7c40d8;
  background-color: transparent;
  border-radius: 50%;
  transition: 0.5s ease all;
}

button span {
  position: absolute;
  top: 34px;
  left: 35px;
  display: block;
  width: 30px;
  height: 4px;
  background-color: transparent;
  border-radius: 10px;
  transform: rotateZ(52deg);
  transition: 0.5s ease all;
}

button span:before,
button span:after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 25px; //放大镜手柄长短
  height: 4px; //放大镜手柄粗细
  background-color: #7c40d8;
  border-radius: 8px;
  transform: rotateZ(0);
  transition: 0.5s ease all;
}

#s-cover:hover #s-circle {
  left: 19px;
  top: -21px;
  width: 40px;
  height: 4px;
  border-width: 0;
  background-color: #7c40d8;
  border-radius: 20px;
}

#s-cover:hover span {
  top: 35%;
  left: 40px;
  width: 20px;
  margin-top: -8px;
  transform: rotateZ(0) scale(0.8);
}

#s-cover:hover button span:before {
  bottom: 11px;
  transform: rotateZ(52deg);
}

#s-cover:hover button span:after {
  bottom: -11px;
  transform: rotateZ(-52deg);
}

#s-cover:hover button span:before,
#s-cover:hover button span:after {
  right: -10px;
  width: 34px;
  background-color: #7c40d8;
}

.application-list {
  width: 90%;
  height: 18vh;
  margin-left: auto;
  margin-right: auto;
  // background-color: pink;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  overflow-x: hidden;
  padding-top: 2px;
}

.application {
  width: 15vw;
  height: 7.4vh;
  background-color: white;
  border-radius: 10px;
  box-shadow: #7c40d8 0 0 4px;
  display: flex;
  flex-direction: row;
  margin-right: 20px;
  margin-left: 2px;
  margin-bottom: 20px;
  color: #3a2a88;

  p {
    text-align: center;
    font-size: 18px;
    line-height: 20px;
    margin-top: auto;
    margin-bottom: auto;
    margin-left: 50px;
  }
}

.application_selected {
  .application();
  background: linear-gradient(to bottom, #7c41d9, #614ef7);
  border-radius: 10px;
  box-shadow: #7c40d8 0 0 1px;
  color: #d8d1d1;
}

.application-icon {
  margin-top: auto;
  margin-bottom: auto;
  margin-left: 20px;
}

.all-check-button {
  width: 24px;
  height: 24px;
  margin-left: 24px;
  margin-top: 8px;

  // margin-top: 8px;
  // background-color: red;
  #check_box {
    position: relative;
    left: 22%;
    appearance: none;
    width: 26px;
    height: 26px;
    font-size: 14px;
    border: 2px solid #4a1691;
  }

  input[type='checkbox']::after {
    position: absolute;
    top: -4px;
    color: #000;
    width: 20px;
    height: 20px;
    display: inline-block;
    visibility: visible;
    padding-left: 0px;
    text-align: center;
  }

  input[type='checkbox']:checked::after {
    content: '✔';
    color: #130067;
    font-size: 20px;
    font-weight: bold;
    // background-color: #fff;
  }
}

.delete_application {
  .application();
  position: relative;
  width: 150px;
  height: 16vh;
  justify-content: flex-start;

  img {
    position: relative;
    top: -4px;
    width: 60px;
    height: 60px;
    border-radius: 10px;
    // background-color: #000;
  }

  p {
    text-align: left;
    font-size: 18px;
    margin-left: 10px;
    margin-bottom: 10px;
    font-weight: bold;
  }

  .message-box {
    margin-top: auto;
    margin-bottom: auto;
  }

  .group-message {
    .to-center-ab();
    top: 80%;
    white-space: nowrap;
    font-size: 16px;
  }
}

.delete_application_selected {
  .delete_application();
  background: linear-gradient(to bottom, #7c41d9, #614ef7);
  border-radius: 10px;
  box-shadow: #7c40d8 0 0 1px;
  color: #d8d1d1;
}

/* ::selection{
  background-color:red;
}
 */
.mbody-footer {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.all-check-button {
  position: relative;
  top: -18px;
  width: 50px;
  height: 50px;
  color: #21134c;
  font-size: 40px;
  float: right;
  cursor: default;
}

.check-button {
  position: relative;
  top: -18px;
  width: 50px;
  height: 50px;
  color: #21134c;
  font-size: 40px;
  float: right;
  cursor: default;
}

.fly2-1 {
  position: absolute;
  width: 180px;
  height: 60px;
  top: -40px;
  left: 400px;
}

.fly2-2 {
  position: absolute;
  width: 90px;
  height: 30px;
  top: 10px;
  right: 30px;
  z-index: 10;
}
</style>
