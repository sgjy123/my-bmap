import request from 'service/request';

// 登录地址
export function loginUrl(params) {
    return request({
        url: '/pontos/user/login',
        method: 'post',
        data: params,
    });
}
// 登录地址
export function logOutUrl(params) {
    return request({
        url: '/pontos/user/logout',
        method: 'post',
    });
}
