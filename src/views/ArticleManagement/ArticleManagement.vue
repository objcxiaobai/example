<template>
  <div class="common-base">
    <el-table border :data="test">
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="content" label="内容"></el-table-column>
      <el-table-column label="操作">
        <template v-slot="scope">
          <!-- <router-link :to="'/base-rich-text/'+scope.$index">
          <el-button type="text">编辑</el-button>-->
          <el-button type="text" @click="pushRich(scope.$index)"
            >编辑</el-button
          >
          <!-- </router-link> -->
        </template>
      </el-table-column>
    </el-table>
    <p>{{ item }}</p>
  </div>
</template>

<script>
import Bus from "@/utils/bus.js";
export default {
  name: "article-management",
  data() {
    return {
      test: [
        {
          title: "文章1",
          content: "宇宙最最帅！！！！！"
        },
        {
          title: "文章2",
          content: "宇宙最最靓仔！！！！！"
        }
      ],
      index: 0,
      item: {}
    };
  },

  methods: {
    pushRich(index) {
      this.$router.push({ path: "/base-rich-text", query: { index: index } });
    },
    updataList(item, index) {
      if (!item && !index) return false;
      const obj = this.test[index];
      obj.content = item;
      this.test.splice(index, 1, obj);
      this.item = obj;
    }
  },
  created() {
    this.$bus.$on("success-content", this.updataList);
  },
  mounted() {
    console.log(this.test);
  }
};
</script>
