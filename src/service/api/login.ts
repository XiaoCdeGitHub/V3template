import axios from '../myAxios';
// 用户登录表单

export interface LoginReqForm {
  cipher: string;
}

// 用户登录
export const login = (params: LoginReqForm): Promise<any> => {
  return axios.post('/login', params);
};
