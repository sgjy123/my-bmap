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
export function cacheListTwoUrl(params) {
    return request({
        url: '/pontos/cacheInterfaceConfig/query',
        method: 'post',
        data: params,
    });
}
// 更新数据状态-二级列表
export function refreshListTwoUrl(params) {
    return request({
        url: '/pontos/cacheInterfaceConfig/refresh',
        method: 'post',
        data: params,
    });
}
// 更新数据状态-一级列表
export function refreshListOneUrl(params) {
    return request({
        url: '/pontos/cacheRequestPathConfig/refresh',
        method: 'post',
        data: params,
    });
}
// 新增和编辑缓存信息-一级列表
export function saveCacheListOneUrl(params) {
    return request({
        url: '/pontos/cacheRequestPathConfig/save',
        method: 'post',
        data: params,
    });
}
// 删除缓存信息-一级列表
export function deleteCacheListOneUrl(params) {
    return request({
        url: '/pontos/cacheRequestPathConfig/delete',
        method: 'post',
        data: params,
    });
}
// 查询详情-二级列表
export function detailCacheListTwoUrl(params) {
    return request({
        url: '/pontos/cacheInterfaceConfig/detail',
        method: 'post',
        data: params,
    });
}
