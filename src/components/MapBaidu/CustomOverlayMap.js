import React from 'react';
import CustomOverlay from 'react-bmapgl/Overlay/CustomOverlay'
import PropTypes from 'prop-types';
const {BMapGL} = window;
CustomOverlayMap.propTypes = {
    position: PropTypes.object.isRequired, // 标注点的坐标
    autoViewport: PropTypes.bool, // 自动聚焦视野
    offset: PropTypes.number, // 标注的偏移值
    unit: PropTypes.string, // 标注的偏移单位，可选米或者像素 "m" | "px"
    zIndex: PropTypes.string, // 元素的zIndex属性
}
CustomOverlayMap.defaultProps = {
    position: new BMapGL.Point(116.35, 39.88)
}
function CustomOverlayMap(props) {
    const {
        map,
        position,
        autoViewport,
        offset,
        unit,
        zIndex,
        children
    } = props;
    return (
        <CustomOverlay position={position}
                       autoViewport={autoViewport}
                       offset={offset}
                       unit={unit}
                       zIndex={zIndex}
                       map={map}>
            {
                children
            }
        </CustomOverlay>
    )
}

export default CustomOverlayMap;
