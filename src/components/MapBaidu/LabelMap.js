import React from 'react';
import Label from 'react-bmapgl/Overlay/Label'
import PropTypes from 'prop-types';

const {BMapGL} = window;
LabelMap.propTypes = {
    position: PropTypes.object.isRequired, // 信息窗口的坐标
}
LabelMap.defaultProps = {
    position: new BMapGL.Point(116.35, 39.88)
}

function LabelMap(props) {
    const {
        map,
        position,
        text,
        offset,
        style
    } = props;
    return (
        <Label map={map}
               position={position}
               text={text}
               offset={offset}
               style={style}>
        </Label>
    )
}

export default LabelMap;
