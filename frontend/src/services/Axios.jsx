import axios from "axios";

const Axios = axios.create({
    baseURL:  "http://localhost:2000"
})
//"https://taskify-admin.onrender.com" ||
Axios.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token')
    if(token) config.headers.Authorization= `Bearer ${token}`
    return config
})

export default Axios