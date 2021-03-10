import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import nprogress from 'nprogress'
import { ElMessage } from 'element-plus'


const ispro = process.env.NODE_ENV === "production";
const http: AxiosInstance = axios.create({
    baseURL: ispro ? "线上接口" : "/api",
    timeout: 10000,
})

http.interceptors.request.use((confirm: AxiosRequestConfig) => { 
    nprogress.start()
    // //配置token token是鉴权的一种方式
    // //在登陆成功之后 会返回当前用户的token 存本地
    // let token = localStorage.getItem('token')
    // if (token) {
    //     confirm.headers.Authorization = token
    // }
    return confirm
}, (err: any) => {
    nprogress.done()
    return Promise.reject(err)
})

http.interceptors.response.use((res: AxiosResponse<any>) => {
    return res.data
}, (err: any) => {
    nprogress.done();
    const stutas = err.response && err.response.status;
    //状态码
    if (stutas === 400) {
        ElMessage.error("参数错误");
    }
    if (stutas === 401) {
        ElMessage.error("没有权限");
    }
    if (stutas === 403) {
        ElMessage.error("登陆过期");
    }
    if (stutas === 404) {
        ElMessage.error("路径错误");
    }
    if (stutas === 500) {
        ElMessage.error("服务器错误");
    }
    if (stutas === 503) {
        ElMessage.error("服务器在维护");
    }
})

export default http