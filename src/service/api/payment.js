import request from 'service/request';

// 获取合同款项信息列表服务
export function paymentListUrl(params) {
    return request({
        url: '/contract/get_payment_list',
        method: 'post',
        data: params,
    });
}
