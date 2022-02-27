import request from 'service/request';

// 获取合同排产计划列表服务
export function planListUrl(params) {
    return request({
        url: '/contract/get_schedule_list',
        method: 'post',
        data: params,
    });
}
