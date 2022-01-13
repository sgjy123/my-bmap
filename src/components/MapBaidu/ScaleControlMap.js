import React from 'react';
import ScaleControl from 'react-bmapgl/Control/ScaleControl';
import PropTypes from 'prop-types';
import NavigationControlMap from "./NavigationControlMap";
ScaleControlMap.propTypes = {
    /**
     * 控件的位置，可传下面4个参数：
     * 0: 左上
     * 1: 右上
     * 2: 左下
     * 3: 右下
     */
    anchor: PropTypes.number
}
ScaleControlMap.defaultProps = {
    anchor: 0
}
function ScaleControlMap(props) {
    const {
        anchor,
        offset
    } = props;
    return (
        <ScaleControl anchor={anchor} offset={offset}/>
    )
}

export default ScaleControlMap;
