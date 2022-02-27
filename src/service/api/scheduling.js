import request from 'service/request';

// 获取排产资料确认情况服务
export function schedulingListUrl(params) {
    return request({
        url: '/contract/get_schedule_confirm_list',
        method: 'post',
        data: params,
    });
}
// 排产资料确认服务
export function confirmSchedulingListUrl(params) {
    return request({
        url: '/contract/update_schedule_confirm',
        method: 'post',
        data: params,
    });
}

