import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';
const KEY = '38624939-e92997ad19b30f4e8eb520cfa';

export async function getImages(query, page = 1) {
  const params = new URLSearchParams({
    key: KEY,
    q: query,
    page: page,
    per_page: 12,
    image_type: 'photo',
    orientation: 'horizontal',
  });
    const result = await axios.get(`?${params}`);
    return result.data;
}
