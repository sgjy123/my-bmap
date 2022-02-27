import request from 'service/request';

// 获取物资明细信息列表服务
export function materialListUrl(params) {
    return request({
        url: '/contract/get_material_list',
        method: 'post',
        data: params,
    });
}
