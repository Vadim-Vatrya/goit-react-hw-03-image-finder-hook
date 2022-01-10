import axios from 'axios';
import PropTypes from 'prop-types';

const API_KEY = '19735813-38939a283ca61b34fac8c005d';
axios.defaults.baseURL = 'https://pixabay.com/api';
// const BASE_URL = 'https://pixabay.com/api/';

// axios.defaults.baseURL = BASE_URL;
// axios.defaults.params = {
//   key: API_KEY,
//   image_type: 'photo',
//   orientation: 'horizontal',
//   per_page: 12,
// }

const fetchImages = ({ search = '', currentPage = 1, perPage = 12 }) => {
  return axios
    .get(
      `?q=${search}&per_page=${perPage}&page=${currentPage}&image_type=photo&orientation=horizontal&key=${API_KEY}`,
    )
    .then(response => response.data);
};

fetchImages.propTypes = {
  search: PropTypes.string,
  currentPage: PropTypes.number,
};

export default { fetchImages };
