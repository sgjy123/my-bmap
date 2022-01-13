import React from 'react';
import PropTypes from 'prop-types';
import MapTypeControl from 'react-bmapgl/Control/MapTypeControl';

TypeControlMap.propTypes = {
    /**
     * 控件的位置，可传下面4个参数：
     * 0: 左上
     * 1: 右上
     * 2: 左下
     * 3: 右下
     */
    anchor: PropTypes.number,
}
TypeControlMap.defaultProps = {
    anchor: 1,
    offset: null
}

function TypeControlMap(props) {
    const {
        anchor,
        offset
    } = props;
    return (
        <MapTypeControl anchor={anchor} offset={offset}/>
    )
}

export default TypeControlMap;
