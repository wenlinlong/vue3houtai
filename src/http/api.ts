import http from './index'

export default {
    //登录
    login({ username, password }: { username: string; password: string}) {
        return http.post('/user/login', {
            username: username,
            password: password,
        })
    },
    //轮播
    lunbo(){
        return http.get('/scenics/banners')
    },
    //导航栏
    getNav(){
        return http.get('/nav/getNav')
    }
}