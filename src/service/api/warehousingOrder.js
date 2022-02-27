import request from 'service/request';

// 获取合同入库单列表服务
export function warehousingOrderListUrl(params) {
    return request({
        url: '/contract/get_entry_list',
        method: 'post',
        data: params,
    });
}
