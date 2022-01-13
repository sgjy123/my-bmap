import React from 'react';
import NavigationControl from 'react-bmapgl/Control/NavigationControl';
import PropTypes from 'prop-types';
NavigationControlMap.propTypes = {
    /**
     * 控件的位置，可传下面4个参数：
     * 0: 左上
     * 1: 右上
     * 2: 左下
     * 3: 右下
     */
    anchor: PropTypes.number
}
NavigationControlMap.defaultProps = {
    anchor: 2
}
function NavigationControlMap(props) {
    const {
        anchor,
        offset
    } = props;
    return (
        <NavigationControl anchor={anchor} offset={offset}/>
    )
}

export default NavigationControlMap;
