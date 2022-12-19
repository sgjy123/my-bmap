import request from 'service/request';

// 获取缓存信息列表数据
export function cacheListUrl(params) {
    return request({
        url: '/pontos/cacheInterfaceConfig/query',
        method: 'post',
        data: params,
    });
}
// 更新数据状态
export function refreshListUrl(params) {
    return request({
        url: 'pontos/cacheInterfaceConfig/refresh',
        method: 'post',
        data: params,
    });
}
