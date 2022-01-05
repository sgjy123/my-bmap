// 导入路由组件
import ALayout from 'pages/layout';
const routes = [
    {
        path: '/layout',
        component: ALayout,
        key: '/layout'
    }
];
routes.push({
    to: '/layout',
    component: ALayout,
    key: '/layout'
})
export default routes;
