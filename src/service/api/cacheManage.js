import request from 'service/request';

// 获取缓存信息-一级列表数据
export function cacheListOneUrl(params) {
    return request({
        url: '/pontos/cacheRequestPathConfig/query',
        method: 'post',
        data: params,
    });
}

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
// 新增和编辑缓存信息
export function saveCacheListUrl(params) {
    return request({
        url: '/pontos/cacheInterfaceConfig/save',
        method: 'post',
        data: params,
    });
}
