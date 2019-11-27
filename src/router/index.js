import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

// 所有权限通用路由表
//登录页
export const constantRouterMap = [
  {
    path: '/login',
    component: resolve => require(['@/views/Login/Login.vue'], resolve)
  }
];

// 异步挂加载的路由
export const asyncRouterMap = [
  {
    path: '/',
    component: resolve => require(['@/views/Home.vue'], resolve),
    redirect: {
      name: 'base-controller'
    },
    children: [
      {
        path: '/base-controller',
        name: 'base-controller',
        meta: {
          title: '系统首页'
        },
        component: resolve =>
          require(['@/views/BaseController/BaseController.vue'], resolve)
      },
      {
        path: '/base-management',
        name: 'base-management',
        meta: {
          role: ['admin'],
          title: 'tab基本操作'
        },
        component: resolve =>
          require(['@/views/BaseManagement/BaseManagement.vue'], resolve)
      },
      {
        path: '/article-management',
        name: 'article-management',
        meta: {
          role: ['admin'],
          title: '文章管理'
        },
        component: resolve =>
          require(['@/views/ArticleManagement/ArticleManagement.vue'], resolve)
      },
      {
        path: '/base-rich-text',
        name: 'base-rich-text',
        meta: {
          role: ['admin'],
          title: '富文本操作'
        },
        component: resolve =>
          require(['@/views/BaseRichText/BaseRichText.vue'], resolve)
      },
      {
        path: '/paging',
        name: 'paging',
        meta: {
          role: ['admin'],
          title: '分页操作'
        },
        component: resolve => require(['@/views/Paging/Paging.vue'], resolve)
      }
    ]
  }
];

// 不同权限的人

// 原始
const routes = [
  {
    path: '/',
    redirect: '/base-controller'
  },
  {
    path: '/',
    component: resolve => require(['@/views/Home.vue'], resolve),
    meta: { title: '自述文件' },
    children: [
      {
        path: '/base-controller',
        meta: {
          title: '系统首页'
        },
        component: resolve =>
          require(['@/views/BaseController/BaseController.vue'], resolve)
      },
      {
        path: '/base-management',
        meta: {
          title: 'tab基本操作'
        },
        component: resolve =>
          require(['@/views/BaseManagement/BaseManagement.vue'], resolve)
      },
      {
        path: '/article-management',
        meta: {
          title: '文章管理'
        },
        component: resolve =>
          require(['@/views/ArticleManagement/ArticleManagement.vue'], resolve)
      },
      {
        path: '/base-rich-text',
        name: 'base-rich-text',
        meta: {
          title: '富文本操作'
        },
        component: resolve =>
          require(['@/views/BaseRichText/BaseRichText.vue'], resolve)
      },
      {
        path: '/paging',
        name: 'paging',
        meta: {
          title: '分页操作'
        },
        component: resolve => require(['@/views/Paging/Paging.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: resolve => require(['@/views/Login/Login.vue'], resolve)
  }
];

const router = new VueRouter({
  routes: constantRouterMap
});

export default router;
