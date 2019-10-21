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
          title: "导航栏1"
        },
        component: resolve =>
          require(["@/views/BaseManagement/BaseManagement.vue"], resolve)
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
