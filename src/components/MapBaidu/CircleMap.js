import React from 'react';
import PropTypes from 'prop-types';
import Circle from 'react-bmapgl/Overlay/Circle'

const {BMapGL} = window;
const centerPoint = new BMapGL.point(116.404449, 39.914889);
CircleMap.propTypes = {
    center: PropTypes.array.isRequired, // 圆形的坐标数组
    radius: PropTypes.number.isRequired, // 圆形的半径，单位为米
    autoViewport: PropTypes.bool, // 自动聚焦视野
    enableEditing: PropTypes.bool, // 开启可编辑模式
    enableMassClear: PropTypes.bool,// 可通过map.clearOverlays()方法移除
    fillColor: PropTypes.string, // 面填充颜色，同CSS颜色
    fillOpacity: PropTypes.number, // 面填充的透明度，范围0-1
    strokeColor: PropTypes.string, // 描边的颜色，同CSS颜色
    strokeOpacity: PropTypes.number, // 描边的透明度，范围0-1
    strokeStyle: PropTypes.string, // 描边的样式，为实线、虚线、或者点状线
    strokeWeight: PropTypes.number, // 描边的宽度，单位为像素
    viewportOptions: PropTypes.object, // autoViewport打开时生效，配置视野的参数
}
CircleMap.defaultProps = {
    center: centerPoint,
    radius: 10
}

function CircleMap(props) {
    const {
        center,
        radius,
        autoViewport,
        enableEditing,
        enableMassClear,
        fillColor,
        fillOpacity,
        strokeColor,
        strokeOpacity,
        strokeStyle,
        strokeWeight,
        viewportOptions
    } = props;
    return (
        <Circle center={center}
                radius={radius}
                autoViewport={autoViewport}
                enableEditing={enableEditing}
                enableMassClear={enableMassClear}
                fillColor={fillColor}
                fillOpacity={fillOpacity}
                strokeColor={strokeColor}
                strokeOpacity={strokeOpacity}
                strokeStyle={strokeStyle}
                strokeWeight={strokeWeight}
                viewportOptions={viewportOptions}/>
    )
}

export default CircleMap;