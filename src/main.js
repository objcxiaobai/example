import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueRouter from "vue-router";
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);

// 防止一直调用GenerateRoutes
let isLogin = false;

router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem("my_username");
  // 如果用户不存在
  if (!role && to.path !== "/login") {
    next(`/login`);
  } else {
    //这里可以做其他操作.
    const roles = "admin";
    // 假设是admin权限
    if (roles === "admin" && !isLogin) {
      store
        .dispatch("GenerateRoutes", { roles })
        .then(() => {
          router.addRoutes(store.getters.addRouters);
          isLogin = true;
          next();
        })
        .catch(err => {
          console.log(err);
          next(`/login?redirect=${to.path}`);
        });
    } else {
      next();
    }
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
