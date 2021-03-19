import axios from 'axios';
import Vue from 'vue';
import VueRouter from './router';

const http = axios.create({
  // 上线路径处理
  baseURL: process.env.VUE_APP_ADMIN_API || '/admin/api'
  // baseURL: "http://localhost:3000/admin/api"
});
http.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config;
}, err => {
  return Promise.reject(err)
})
http.interceptors.response.use(res => {
  return res
}, err => {
  if (err.response.data.message) {
    Vue.prototype.$message({
      type: 'error',
      message: err.response.data.message
    })
    // console.log(err.response);
    if (err.response.status === 401) {
      VueRouter.push('/');
    }
  }
  return Promise.reject(err)
})

export default http;