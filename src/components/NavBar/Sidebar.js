/**
 * index: 路由名=>path
 * title: 导航名
 * icon:  图标
 */
import store from "../.././store";

// const sidebarList = [
//   {
//     index: "base-management",
//     title: "tab基本操作",
//     icon: ""
//   },
//   {
//     index: "article-management",
//     title: "文章管理",
//     icon: ""
//   },
//   {
//     index: "paging",
//     title: "分页操作",
//     icon: ""
//   }
// ];
const sidebarList = store.getters.getAllSidebar;
export default sidebarList;
