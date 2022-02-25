// 导入路由组件
import Login from 'pages/login';
import ALayout from 'pages/layout';
const routes = [
    {
        path: '/login',
        component: Login,
        key: '/login',
    },
    {
        path: '/layout',
        component: ALayout,
        key: '/layout',
    }
];
routes.push({
    to: '/login',
    redirect: true,
    component: Login,
    key: '/login'
})
export default routes;
