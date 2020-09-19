import axios from 'axios'
import Vue from "vue"
import qs from 'qs'
import {
  Loading,
  Message
} from 'element-ui';
import router from '../router/index'
import merge from 'lodash/merge'
// import {  } from "element-ui"
// 创建实例
const service = axios.create({
});
var loadingInstance;
// axios拦截器
axios.interceptors.request.use(request => {

  loadingInstance = Loading.service({
    'background': "rgba(0,0,0,0)"
  });
  request.headers['Content-Type'] = 'application/json';
  let token = sessionStorage.getItem("token")
  if( token) {
    
      request.headers['security_monitor_token'] = token
  }
  // request.baseURL = process.env.baseURL
  return request;

});

// 拦截响应
axios.interceptors.response.use((response) => {
    loadingInstance.close();
    console.log("11111",response.data)
     if (response.data.code == 401) {
      Message({
        message: response.data.msg,
        type: 'warning'
      });
      router.push({
        path: "/",
        query: {}
      })
      return response.data;
    } else {
      return response.data
    }
  },
  axios.adornData = (data = {}, openDefultdata = true, contentType = 'json') => {
    var defaults = {
      't': new Date().getTime()
    }
    data = openDefultdata ? merge(defaults, data) : data
    return contentType === 'json' ? JSON.stringify(data) : qs.stringify(data)
  },

  error => {
    return Promise.reject(error.message); // 返回接口返回的错误信息
  });

export default service;