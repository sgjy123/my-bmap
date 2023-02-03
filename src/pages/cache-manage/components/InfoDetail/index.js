import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {Descriptions} from "antd";
import {detailCacheListTwoUrl} from 'service/api/cacheManage';

const InfoDetail = (props) => {
    const {infoId} = props;
    const [detail, setDetail] = useState({});
    useEffect(()=>{
        getDetail();
    },[]);
    const getDetail = ()=> {
        detailCacheListTwoUrl({
            id: infoId
        }).then((res)=>{
            const {code} = res;
            if (code === 200) {
                setDetail(res?.data);
            } else {
                setDetail({});
            }
        })
    }
    return (
        <Descriptions title="详情信息" column={1}>
            <Descriptions.Item label="业务主键">{detail.id}</Descriptions.Item>
            <Descriptions.Item label="缓存接口路径">{detail.requestPath}</Descriptions.Item>
            <Descriptions.Item label="缓存接口参数">{detail.requestParam}</Descriptions.Item>
            <Descriptions.Item label="缓存接口请求方式">{detail.requestMethod}</Descriptions.Item>
            <Descriptions.Item label="缓存key">{detail.cacheKey}</Descriptions.Item>
            <Descriptions.Item label="有效时间 (单位:秒)">{detail.cacheTimeout}</Descriptions.Item>
            <Descriptions.Item label="最新一次刷新缓存时间">{detail.cacheLatestTime}</Descriptions.Item>
            <Descriptions.Item label="状态">
                {detail.status === 1 ? '有效' : '无效'}
            </Descriptions.Item>
            <Descriptions.Item label="缓存状态">{detail.cacheStatus}</Descriptions.Item>
            <Descriptions.Item label="缓存值">
                <div>
                    {
                        /*detail?.cacheValue && (Object.entries(detail?.cacheValue) || []).map((item)=>(
                            <div>{item[0]}：{item[1]}</div>
                        ))*/
                        detail?.cacheValue && (Object.entries(detail?.cacheValue) || []).map((item)=>{
                            let dom = <div>{item[0]}：{JSON.stringify(item[1])}</div>
                            return dom;
                        })
                    }
                </div>
            </Descriptions.Item>
            <Descriptions.Item label="缓存剩余有效时间">{detail.seconds}</Descriptions.Item>
            <Descriptions.Item label="创建时间">{detail.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{detail.updateTime}</Descriptions.Item>
        </Descriptions>
    )
}
InfoDetail.propTypes = {
    infoId: PropTypes.any.isRequired, // 查详情id
    visibleDetail: PropTypes.bool, // 关闭抽屉
    setVisibleDetail: PropTypes.func, // 关闭抽屉方法
};
export default InfoDetail;
