import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
Vue.use(ElementUI);

router.beforeEach((to, from, next) => {
  const role = sessionStorage.getItem("my_username");
  // 如果用户不存在
  if (!role && to.path !== "/login") {
    next("/login");
  } else {
    // 这里可以做其他操作.
    next();
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
