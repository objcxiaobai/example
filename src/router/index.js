import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/base-controller"
  },
  {
    path: "/",
    component: resolve => require(["@/views/Home.vue"], resolve),
    meta: { title: "自述文件" },
    children: [
      {
        path: "/base-controller",
        meta: {
          title: "系统首页"
        },
        component: resolve =>
          require(["@/views/BaseController/BaseController.vue"], resolve)
      },
      {
        path: "/base-management",
        meta: {
          title: "tab基本操作"
        },
        component: resolve =>
          require(["@/views/BaseManagement/BaseManagement.vue"], resolve)
      },
      {
        path: "/article-management",
        meta: {
          title: "文章管理"
        },
        component: resolve =>
          require(["@/views/ArticleManagement/ArticleManagement.vue"], resolve)
      },
      {
        path: "/base-rich-text",
        name: "base-rich-text",
        meta: {
          title: "富文本操作"
        },
        component: resolve =>
          require(["@/views/BaseRichText/BaseRichText.vue"], resolve)
      }
    ]
  },
  
];

const router = new VueRouter({
  routes
});

export default router;
