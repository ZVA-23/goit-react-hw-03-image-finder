import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchApi = (name, page) => {
  const config = {
    params: {
      q: name,
      page,
      key: '29884490-c4f2a5a1c3ab9ada3c3f5649a',
      image_type: 'photo',
      orientation: 'horizontal',
      perPage: 12,
    },
  };
  return axios(config);
};
