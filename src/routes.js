import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
// import Main from './views/Main.vue'
import Table from './views/nav1/Table.vue'
import Form from './views/nav1/Form.vue'
import user from './views/nav1/user.vue'
// import Page4 from './views/nav2/Page4.vue'
// import Page5 from './views/nav2/Page5.vue'
import Page6 from './views/nav3/Page6.vue'
import echarts from './views/charts/echarts.vue'
// 公益项目
import PublicBenefitIndex from './views/public-benefit/public-benefit-index'
// 公益机构
import displayName from './views/public-benefit/displayName'
// 发起人
import originator from './views/public-benefit/originator'
// 善款接收方
import receivor from './views/public-benefit/receivor'
// 项目负责人
import leader from './views/public-benefit/leader'
// 分类
import category from './views/public-benefit/category'
// banner
import banner from './views/banner/banner'
//h5管理
import h5 from './views/public-benefit/h5Page'
//keyword
import keyWord from './views/keyword/keyWord'
// 捐款
import donation from './views/donation/donation'
// 建议反馈
import gySuggest from './views/gySuggest/gySuggest'
// 为他证实
import proves from './views/proves/proves'
// 公益咨询
import gyInfos from './views/gyInfos/gyInfos'

// import Initiator from './views/initiator/initiator'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    // { path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: '公益项目2',
        iconCls: 'fa fa-address-card',
        // leaf: true,//只有一个节点
        children: [
            { path: '/public-benefit-index', component: PublicBenefitIndex, name: '公益项目' },
            { path: '/displayName', component: displayName, name: '公益机构' },
            { path: '/originator', component: originator, name: '发起人' },
            { path: '/receivor', component: receivor, name: '善款接收方' },
            { path: '/leader', component: leader, name: '项目负责人' },
            { path: '/category', component: category, name: '分类' },
            { path: '/h5', component: h5, name: 'h5' },
            // { path: '/addH5Page', component: addH5Page, name: 'addH5Page' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/banner', component: banner, name: 'Banner' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '',
    //     iconCls: 'fa fa-address-card',
    //     leaf: true,//只有一个节点
    //     children: [
    //         { path: '/initiator', component: Initiator, name: '发起人' }
    //     ]
    // },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/keyWord', component: keyWord, name: '关键字' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: Page6, name: '导航三' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/donation', component: donation, name: '捐款' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/gySuggest', component: gySuggest, name: '建议反馈' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/proves', component: proves, name: '为TA证实' }
        ]
    },
    {
        path: '/',
        component: Home,
        name: '',
        iconCls: 'fa fa-address-card',
        leaf: true,//只有一个节点
        children: [
            { path: '/gyInfos', component: gyInfos, name: '公益资讯' }
        ]
    },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '系统管理',
    //     iconCls: 'el-icon-message',//图标样式class
    //     children: [
    //         { path: '/user', component: user, name: 'password' },
    //         // { path: '/table', component: Table, name: 'Table' },
    //         // { path: '/form', component: Form, name: 'Form' },
    //         // { path: '/user', component: user, name: '列表' },
    //     ]
    // },
    // {
    //     path: '/',
    //     component: Home,
    //     name: '导航二',
    //     iconCls: 'fa fa-id-card-o',
    //     children: [
    //         { path: '/page4', component: Page4, name: '页面4' },
    //         { path: '/page5', component: Page5, name: '页面5' }
    //     ]
    // },
    
    // {
    //     path: '/',
    //     component: Home,
    //     name: 'Charts',
    //     iconCls: 'fa fa-bar-chart',
    //     children: [
    //         { path: '/echarts', component: echarts, name: 'echarts' }
    //     ]
    // },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export default routes;