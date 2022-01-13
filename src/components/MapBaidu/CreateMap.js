import React from 'react';
import {Map} from "react-bmapgl";
import PropTypes from 'prop-types';
CreateMap.propTypes = {
    center: PropTypes.object, // 中心点坐标
    enableDoubleClickZoom: PropTypes.bool, // 是否开启双击鼠标缩放
    enableDragging: PropTypes.bool, // 是否开启地图可拖拽缩放
    enableRotate: PropTypes.bool, // 是否开启地图旋转功能
    enableScrollWheelZoom: PropTypes.bool, // 是否开启鼠标滚轮缩放
    enableTilt: PropTypes.bool, // 是否开启地图倾斜功能
    heading: PropTypes.number, // 地图旋转角度
    mapStyleV2: PropTypes.object, // 个性化地图样式
    mapType: PropTypes.string, // 地图类型，普通地图或地球模式("normal" | "earth")
    maxZoom: PropTypes.number, // 地图最大缩放级别
    minZoom: PropTypes.number, // 地图最小缩放级别
    style: PropTypes.object, // 地图容器父元素的style样式(CSSProperties)
    tilt: PropTypes.number, // 地图倾斜角度
    zoom: PropTypes.number, // 缩放级别
}
CreateMap.defaultProps = {
    center: {
        lng: 116.404449,
        lat: 39.914889
    },
    style: {position: 'relative', height: '100%'},
    zoom: 12
}

function CreateMap(props) {
    const {
        center,
        enableDoubleClickZoom,
        enableDragging,
        enableRotate,
        enableScrollWheelZoom,
        enableTilt,
        heading,
        mapStyleV2,
        mapType,
        maxZoom,
        minZoom,
        style,
        tilt,
        zoom,
        children
    } = props;
    return (
        <Map center={center}
             enableDoubleClickZoom={enableDoubleClickZoom}
             enableDragging={enableDragging}
             enableRotate={enableRotate}
             enableScrollWheelZoom={enableScrollWheelZoom}
             enableTilt={enableTilt}
             heading={heading}
             mapStyleV2={mapStyleV2}
             mapType={mapType}
             maxZoom={maxZoom}
             minZoom={minZoom}
             style={style}
             tilt={tilt}
             zoom={zoom}>
            {
                children
            }
        </Map>
    )
}

export default CreateMap;
