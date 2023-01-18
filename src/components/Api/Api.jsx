import axios from 'axios';

const axiosApi = axios.create({
  baseURL: 'https://pixabay.com/api',
});

const fetch = async ({ page = 1, searchQuery = '' }) => {
  const response = await axiosApi.get('/', {
    params: {
      q: searchQuery,
      page,
      key: '31619278-8d220fbe6de6d6bbd7864080d',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });
  return response.data.hits;
};

export default fetch;
