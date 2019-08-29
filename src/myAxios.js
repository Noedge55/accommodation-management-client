// import router from './router'
// import axios from 'axios'
// //添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
// }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
// });
//
// // 添加响应拦截器
// axios.interceptors.response.use(function (response) {
//     // 对响应数据做点什么'
//     if(response && response.data){
//         if(response.data.retCode == -999){
//             router.push("/toLogin")
//         }else {
//             return response
//         }
//     }else {
//         return response
//     }
// }, function (error) {
//     // 对响应错误做点什么
//     return Promise.reject(error);
// });

import axios from 'axios';
import router from './router';
import store from './store';

// http request 拦截器
axios.interceptors.request.use(
    config => {
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

// http response 拦截器
axios.interceptors.response.use(
    response => {
        if(response.data.retCode == -999){
            store.commit("clearUser")
            router.push("/toLogin")
        }
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);

export default axios;
