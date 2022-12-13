import React from "react";
import Icon, {ExclamationOutlined} from '@ant-design/icons';

const CustomIcon = (props) => {
    const {svg, style} = props;
    return (
        svg ? (
            <Icon component={svg} style={{...style}}/>
        ) : (<ExclamationOutlined/>)
    )
}

export default CustomIcon;
