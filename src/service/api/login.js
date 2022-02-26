import request from 'service/request';

// 登录地址
export function loginUrl(params) {
    return request({
        url: '/login',
        method: 'post',
        data: params,
    });
}
