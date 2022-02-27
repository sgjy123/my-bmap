import request from 'service/request';

// 获取合同信息列表服务
export function distributionListUrl(params) {
    return request({
        url: '/contract/get_distribution_list',
        method: 'post',
        data: params,
    });
}
