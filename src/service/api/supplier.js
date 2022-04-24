import request from 'service/request';

// 获取合同入供应商成品库列表服务
export function supplierListUrl(params) {
    return request({
        url: '/contract/get_storage_list',
        method: 'post',
        data: params,
    });
}

// 新增/修改/删除入供应商成品库服务
export function updateSupplierUrl(params) {
    return request({
        url: '/contract/update_storage',
        method: 'post',
        data: params,
    });
}

