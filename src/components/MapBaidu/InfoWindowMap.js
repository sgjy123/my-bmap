import React from 'react';
import InfoWindow from 'react-bmapgl/Overlay/InfoWindow';
import PropTypes from 'prop-types';
const {BMapGL} = window;
InfoWindowMap.propTypes = {
    enableMassClear: PropTypes.bool, // 是否在调用Map.clearOverlays()时清除此覆盖物
    height: PropTypes.number, // 信息窗口高度
    offset: PropTypes.number, // 信息窗口的像素偏移
    text: PropTypes.string, // 快速设置信息窗口的内容文本
    title: PropTypes.string, // 设置信息窗口的标题
    width: PropTypes.number, // 信息窗口宽度
}
InfoWindowMap.defaultProps = {
    position: new BMapGL.Point(116.35, 39.88)
}

function InfoWindowMap(props) {
    const {
        map,
        position,
        enableMassClear,
        height,
        offset,
        text,
        title,
        width,
        children
    } = props;
    return (
        <InfoWindow map={map}
                    position={position}
                    enableMassClear={enableMassClear}
                    height={height}
                    offset={offset}
                    text={text}
                    title={title}
                    width={width}>
            {
                children
            }
        </InfoWindow>
    )
}

export default InfoWindowMap;
