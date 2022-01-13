import React from 'react';
import PropTypes from 'prop-types';
import ZoomControl from 'react-bmapgl/Control/ZoomControl'
ZoomControlMap.propTypes = {
    /**
     * 控件的位置，可传下面4个参数：
     * 0: 左上
     * 1: 右上
     * 2: 左下
     * 3: 右下
     */
    anchor: PropTypes.number
}
ZoomControlMap.defaultProps = {
    anchor: 0
}
function ZoomControlMap(props) {
    const {
        anchor,
        offset
    } = props;
    return (
        <ZoomControl anchor={anchor} offset={offset}/>
    )
}

export default ZoomControlMap;
