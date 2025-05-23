import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://www.googleapis.com/books/v2',
  timeout: 5000,
});

export default apiClient;