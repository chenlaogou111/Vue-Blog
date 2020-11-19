import axios from 'axios';

const http = axios.create({
  // 上线兼容性处理
  baseURL: process.env.VUE_APP_ADMIN_API || '/admin/api'
  // baseURL: "http://localhost:3000/admin/api"
});

export default http;