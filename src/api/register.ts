import { post } from "@/utils/methods"

export interface RegisterParam {
    userName?: string
    password?: string
}

export function registerRequest(params: RegisterParam) {
    return post('/user/register', params);
}