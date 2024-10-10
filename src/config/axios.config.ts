import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1",
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});

export default axiosInstance;
