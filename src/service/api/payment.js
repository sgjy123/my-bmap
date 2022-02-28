import request from 'service/request';

// 获取合同款项信息列表服务
export function paymentListUrl(params) {
    return request({
        url: '/contract/get_payment_list',
        method: 'post',
        data: params,
    });
}
// 新增/修改/删除款项申请服务
export function paymentUpdateUrl(params) {
    return request({
        url: '/contract/update_payment',
        method: 'post',
        data: params,
    });
}

