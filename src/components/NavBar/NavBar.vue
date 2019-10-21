<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="activeMenu"
      text-color="#7F96A3"
      active-text-color="#EB9772"
      background-color="#32435F"
      unique-opened
      router
    >
      <template v-for="item in items">
        <!-- 判断一级标题里面是否有二级标题 -->
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <img v-if="item.icon" :src="item.icon" class="nav-image" alt="" />
              <!-- <i class="el-icon-edit"></i> -->
              <span
                :class="{ 'title-middle': item.icon.length <= 2 }"
                slot="title"
                >{{ item.title }}</span
              >
            </template>

            <template v-for="subItem in item.subs">
              <el-menu-item :index="subItem.index" :key="subItem.index">
                <img
                  v-if="subItem.icon"
                  :src="subItem.icon"
                  class="nav-image-two"
                  alt=""
                />
                <span
                  :class="{ 'title-middle': subItem.icon.length <= 2 }"
                  slot="title"
                  >{{ subItem.title }}</span
                >
              </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <!-- 二级标题 -->
        <!-- 一级标题 -->
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <img v-if="item.icon" :src="item.icon" class="nav-image" />
            <!-- <i class="el-icon-lx-copy"></i> -->
            <span
              :class="{ 'title-middle': item.icon.length <= 2 }"
              slot="title"
              >{{ item.title }}</span
            >
          </el-menu-item>
        </template>
        <!-- 一级标题 -->
      </template>
    </el-menu>
  </div>
</template>
<script>
import Sidebar from './Sidebar'
export default {
  data() {
    return {
      items: Sidebar
    };
  },
  computed: {
    // 选择导航栏
    activeMenu() {
      return this.$route.path.replace("/", "");
    }
  }
};
</script>
<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 0;
  /* top: 90px; */
  bottom: 0;
  width: 200px;
  overflow-y: scroll;
  font-family: MicrosoftYaHei;
  font-weight: 400;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar > ul {
  height: 100%;
  border-right: 1px solid #fff;
  background-color: #32435f;
}

.sidebar >>> .el-menu-item {
  font-size: 0.18rem;
}

.sidebar >>> .el-submenu__title {
  font-size: 0.18rem;
}
.sidebar .el-submenu >>> .el-menu-item {
  font-size: 0.14rem;
}

.title-middle {
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-image {
  width: 18px;
  height: 18px;
  margin-right: 9px;
}
.nav-image-two {
  margin-right: 10px;
}
</style>
