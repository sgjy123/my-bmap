import request from 'service/request';

// 获取合同入供应商成品库列表服务
export function supplierListUrl(params) {
    return request({
        url: '/contract/get_storage_list',
        method: 'post',
        data: params,
    });
}
