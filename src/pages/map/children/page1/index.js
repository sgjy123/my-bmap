import {CreateMap,PolygonMap} from 'components/MapBaidu';
// 导入样式
import './index.css';
const {BMapGL} = window;

function MapPage1(props) {
    const getPath = ()=>{
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
            <PolygonMap path={[
                new BMapGL.Point(116.35, 39.88),
                new BMapGL.Point(116.40, 39.92),
                new BMapGL.Point(116.33, 40.01),
            ]} autoViewport={true}/>
            <PolygonMap path={[
                new BMapGL.Point(116.387112, 39.920977),
                new BMapGL.Point(116.385243, 39.913063),
                new BMapGL.Point(116.394226, 39.917988),
                new BMapGL.Point(116.401772, 39.921364),
                new BMapGL.Point(116.41248, 39.927893)
            ]}/>
        </CreateMap>
    )
}

export default MapPage1;
