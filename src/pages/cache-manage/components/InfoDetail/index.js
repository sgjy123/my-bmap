import PropTypes from "prop-types";
import {Descriptions} from "antd";

const InfoDetail = (props) => {
    const {detail} = props;
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
            <Descriptions.Item label="创建时间">{detail.createTime}</Descriptions.Item>
            <Descriptions.Item label="更新时间">{detail.updateTime}</Descriptions.Item>
        </Descriptions>
    )
}
InfoDetail.propTypes = {
    setVisible: PropTypes.func, // 关闭抽屉方法
    setVisibleDetail: PropTypes.func, // 隐藏自己的方法
};
export default InfoDetail;
