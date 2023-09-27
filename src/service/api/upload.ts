import axios from '../myAxios';

export const uploadImg = (params: any): Promise<any> => {
  return axios.post('/upload', params);
};
