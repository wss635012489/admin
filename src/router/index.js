import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import main from '@/components/main'
import frome from '@/components/nav1/from'
import table from '@/components/nav1/table'
import user from '@/components/nav1/user'
import page4 from '@/components/nav2/page4'
import page5 from '@/components/nav2/page5'
import page6 from '@/components/nav3/page6'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      hidden: true
    },
    {
      path: '/',
      name: '导航一',
      component: home,
      iconCls: 'el-icon-menu',
      children: [
        { path: '/main', component: main, name: '主页', hidden: true },
        { path: '/table', component: table, name: 'table' },
        { path: '/form', component: frome, name: 'frome' },
        { path: '/user', component: user, name: '列表' },
      ]
    },
    {
        path: '/',
        component: home,
        name: '导航二',
        iconCls: 'el-icon-setting',
        children: [
            { path: '/page4', component: page4, name: '页面4' },
            { path: '/page5', component: page5, name: '页面5',
             children: [
              { path: '/user', component: user, name: '列表' },
            ] 
          }
        ]
    },
    {
        path: '/',
        component: home,
        name: '',
        iconCls: 'el-icon-rank',
        leaf: true,//只有一个节点
        children: [
            { path: '/page6', component: page6, name: '导航三' }
        ]
    },
  ]
})
