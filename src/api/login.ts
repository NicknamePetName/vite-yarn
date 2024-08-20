import { get, post } from '@/utils/methods'

export interface LoginParam {
    userName?: string,
    password?: string,
}

export function loginRequest(params: LoginParam) {
    return post('/user/login', params); //测试接口
}

export function isLoginRequest() {
    return get('/user/isLogin'); //测试接口
}