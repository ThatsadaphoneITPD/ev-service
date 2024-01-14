
import axiosClient from "./axiosClient"

class HandleUser {
   getUsers = async (url: string) => {
    // return axiosClient.get('/api/products' + url)
    return axiosClient.get('/api' + url)
    // return axiosClient.get('https://jsonplaceholder.typicode.com' + url)
  }

 }

 const handleUsers = new HandleUser()

 export default handleUsers