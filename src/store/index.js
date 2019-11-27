import Vue from 'vue';
import Vuex from 'vuex';
import { reject } from 'q';
import { asyncRouterMap, constantRouterMap } from '../router';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: '',
    userInfor: [
      { id: 1, name: 'xb', done: false },
      { id: 1, name: 'admin', done: true }
    ],
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    setToken(state, n) {
      state.token = n;
    },
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
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
          if (name == 'admin' && password == 'admin') {
            sessionStorage.setItem('my_username', 'admin');
            commit('setToken', 'admin');
            resolve();
          } else {
            reject();
          }
        }, 1000);
      });
    },
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        const accessedRouters = asyncRouterMap.filter(v => {
          if (roles.indexOf('admin') >= 0) {
            return true;
          }
          if (hasPermission(roles, v)) {
            if (v.children && v.children.length > 0) {
              v.children = v.children.filter(child => {
                if (hasPermission(roles, child)) {
                  return child;
                }
                return false;
              });
              return v;
            } else {
              return v;
            }
          }
          return false;
        });
        commit('SET_ROUTERS', accessedRouters);
        resolve();
      });
    }
  },
  modules: {},
  getters: {
    doneUser: state => {
      return state.userInfor.filter(item => item.done);
    },
    addRouters: state => {
      return state.addRouters;
    },
    getAllSidebar: state => {
      const arr = state.addRouters[0].children.reduce(function(per, cur) {
        const obj = {
          index: cur.path,
          title: cur.meta.title,
          icon: ''
        };
        per.push(obj);
        return per;
      }, []);
      return arr;
    }
  }
});
function hasPermission(roles, route) {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true;
  }
}
