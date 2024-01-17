import axios from '../myAxios';

export interface NewsReqForm {
  any: any;
}
export interface DeNewReqForm {
  params: {
    article_id: any;
  };
}
export interface Jobs{
  params: FormData
}

// export const getNews = (): Promise<any> => {
//   return axios.get('/article');
// };
// export const setNews = (params: NewsReqForm): Promise<any> => {
//   return axios.post('/article', params);
// };
// export const editNew = (params: NewsReqForm): Promise<any> => {
//   return axios.put('/article', params);
// };
// export const deleteNew = (article_id: DeNewReqForm): Promise<any> => {
//   return axios.delete('/article', {
//     article_id: article_id,
//   });
// };
export const publicJobs = (params: Jobs): Promise<any> => {
  return axios.post('/admin/publishHomework', params);
}
// //拉取所有注册信息 ok
// function getUserData(params) {
//   return myAxios({
//     url: '/admin/selectAllUsers',
//     method: 'get',
//     data: params,
//   });
// }
export const getUserData = (): Promise<any> => {
  // return axios.get('/admin/selectAllUsers')
  return axios.get('/getUserInfo')
}
// //通过注册申请 ok
// function updateStatus(params) {
//   return myAxios({
//     url: '/admin/passRequest',
//     method: 'post',
//     params: params,
//   });
// }
export const updateStatus = (params: any): Promise<any> => {
  return axios.post('/admin/passRequest', params)
}
// //删除用户账号 ok
// function deleteUser(params) {
//   // if (!params.id) {
//   //   return new Promise(function (res, req) {});
//   // }
//   return myAxios({
//     url: `/admin/deleteUsers`,
//     method: 'post',
//     params: params,
//   });
// }
export const deleteUser = (params: any): Promise<any> => {
  return axios.post('/admin/deleteUsers', params)
}
// //获取搜索到的结果
// function getSearchList(params) {
//   return myAxios({
//     url: 'user/fuzzy/student',
//     method: 'post',
//     data: params,
//     // retryTimes: 3,
//     // repeat_request_cancel: false,
//   });
// }
export const getSearchList = (params: any): Promise<any> => {
  return axios.post('user/fuzzy/student', params)
}
// //获取过滤结果
// function getFilter(params){
//   return myAxios({
//     url:'/admin/selectCondition',
//     method:'post',
//     data:params
//   })
// }
export const getFilter = (params: any): Promise<any> => {
  return axios.post('/admin/selectCondition',params)
}
// function fuzzyStudents(params) {
//   return myAxios({
//     url: 'user/fuzzy/student',
//     method: 'post',
//     data: params,
//   });
// }
export const fuzzyStudents = (params: any): Promise<any> => {
  return axios.post('user/fuzzy/student',params)
}

// function download(params) {
//   return myAxios({
//     url: '/download',
//     method: 'post',
//     data: params,
//   });
// }
export const download = (params: any): Promise<any> => {
  return axios.post('/download',params)
}
