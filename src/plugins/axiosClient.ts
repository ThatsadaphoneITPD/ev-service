import axios from "axios";
const axiosClient = axios.create()
axiosClient.interceptors.request.use(async( config: any) => {

  config.headers = {
    'Content-type': 'application/json',
    ...config.headers,

  }

  // const token = localStorage.getItem('token');
  // // If token exists, add Authorization header
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`;
  // }
  config.data
  return config
})

axiosClient.interceptors.response.use((response) => {
  if (response.status === 200 && response.data) {
    return response.data
  }

  return response
},
error => {
  console.warn(`Error connecting to database, ${error.message}`)
})

export default axiosClient
