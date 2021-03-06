import React from "react";
import {
    CreateMap,
    NavigationControlMap,
    PolygonMap,
    ScaleControlMap,
    TypeControlMap,
    ZoomControlMap,
    LabelMap,
    CircleMap,
    InfoWindowMap,
    MarkerMap
} from 'components/MapBaidu';
import ICON from 'assets/images/cc-pointer-left.png';
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
            {/*<TypeControlMap anchor={1}/>*/}
            {/*<NavigationControlMap anchor={1}/>*/}
            {/*<ScaleControlMap anchor={2}/>*/}
            {/*<ZoomControlMap/>*/}
            {/*<PolygonMap path={[*/}
            {/*    new BMapGL.Point(116.35, 39.88),*/}
            {/*    new BMapGL.Point(116.40, 39.92),*/}
            {/*    new BMapGL.Point(116.33, 40.01),*/}
            {/*]}/>*/}
            {/*<LabelMap text="我是一个label"/>*/}
            {/*<InfoWindowMap position={new BMapGL.Point(116.40, 39.91)}*/}
            {/*               title="标题"*/}
            {/*               text="快速文本信息窗口"/>*/}
            {/*<CircleMap radius={5000}/>*/}
            {/*<MarkerMap icon={ new BMapGL.Icon(ICON, new BMapGL.Size(52, 26))}/>*/}
        </CreateMap>
    )
}

export default MapPage1;
