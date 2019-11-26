import Vue from "vue";
import Vuex from "vuex";
import { reject } from "q";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    userInfor: [
      { id: 1, name: "xb", done: false },
      { id: 1, name: "admin", done: true }
    ]
  },
  mutations: {
    setToken(state, n) {
      state.token = n;
    }
  },
  actions: {
    // 登录操作
    LoginByUsername({ commit }, userInfo) {
      const name = userInfo.name.trim();
      const password = userInfo.password;
      return new Promise((resolve, reject) => {
        // 模拟异步
        setTimeout(() => {
          if (name == "admin" && password == "admin") {
            sessionStorage.setItem("my_username", "admin");
            commit("setToken", "admin");
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    }
  },
  modules: {},
  getters: {
    doneUser: state => {
      return state.userInfor.filter(item => item.done);
    }
  }
});
