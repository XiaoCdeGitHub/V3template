import axios from '../myAxios';

export interface NewsReqForm {
  any: any;
}
export interface DeNewReqForm {
  params: {
    article_id: any;
  };
}

export const getNews = (): Promise<any> => {
  return axios.get('/article');
};
export const setNews = (params: NewsReqForm): Promise<any> => {
  return axios.post('/article', params);
};
export const editNew = (params: NewsReqForm): Promise<any> => {
  return axios.put('/article', params);
};
export const deleteNew = (article_id: DeNewReqForm): Promise<any> => {
  return axios.delete('/article', {
    article_id: article_id,
  });
};
