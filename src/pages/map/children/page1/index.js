import React from "react";
import {
    CreateMap,
    NavigationControlMap,
    PolygonMap,
    ScaleControlMap,
    TypeControlMap,
    ZoomControlMap
} from 'components/MapBaidu';
// 导入样式
import './index.css';

const {BMapGL} = window;

function MapPage1(props) {
    const getPath = () => {
        let pathArr = [];
        var bd = new BMapGL.Boundary().get('顺义区', function (rs) {
            pathArr.push(rs.boundaries);
        });
        console.log(bd);
        console.log(pathArr);
    }
    getPath();
    return (
        <CreateMap
            enableScrollWheelZoom={true}
            mapStyleV2={
                {'styleId': "761ab2a918865d27dbbfe815abc87233"}
            }
        >
            <TypeControlMap anchor={1}/>
            <NavigationControlMap anchor={1}/>
            <ScaleControlMap anchor={2}/>
            <ZoomControlMap/>
            <PolygonMap path={[
                new BMapGL.Point(116.35, 39.88),
                new BMapGL.Point(116.40, 39.92),
                new BMapGL.Point(116.33, 40.01),
            ]}/>
        </CreateMap>
    )
}

export default MapPage1;
