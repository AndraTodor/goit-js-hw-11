import axios from 'axios';

const API_KEY = '45001008-a8478de3e072fcb427e163bfe';
const BASE_URL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page = 1) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: 20,
      },
    });
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
