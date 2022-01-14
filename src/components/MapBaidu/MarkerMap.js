import React from 'react';
import Marker from 'react-bmapgl/Overlay/Marker';
import PropTypes from 'prop-types';
const {BMapGL} = window;
MarkerMap.propTypes = {
    position: PropTypes.object.isRequired, // 标注点的坐标
    autoViewport: PropTypes.bool, // 自动聚焦视野
    enableDragging: PropTypes.bool, // 是否可拖拽
    enableMassClear: PropTypes.bool, // 是否在调用Map.clearOverlays()时清除此覆盖物
    isTop: PropTypes.bool, // 是否将标注置于其他标注之上。默认情况下纬度低盖住纬度高的标注
    offset: PropTypes.number, // 标注的像素偏移
}
MarkerMap.defaultProps = {
    position: new BMapGL.Point(116.35, 39.88),
    icon: 'loc_blue'
}

function MarkerMap(props) {
    const {
        map,
        position,
        autoViewport,
        enableDragging,
        enableMassClear,
        icon,
        isTop,
        offset
    } = props;
    return (
        <Marker map={map}
                position={position}
                autoViewport={autoViewport}
                enableDragging={enableDragging}
                enableMassClear={enableMassClear}
                icon={icon}
                isTop={isTop}
                offset={offset}/>
    )
}

export default MarkerMap;
