<template>
  <div>
    <el-table :data="list" border>
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column prop="name" label="名字"></el-table-column>
      <el-table-column prop="sex" label="性别"></el-table-column>
    </el-table>
    <div class="center">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        :current-page="curent"
        @current-change="currentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: "paging",
  data() {
    return {
      // 原始数据
      list: [],
      // 分页数据
      test: [],
      // 当前页数
      curent: 0,
      // 页数
      total: 0
    };
  },
  methods: {
    currentChange: function(e) {
      let idx = e - 1;
      this.curent = idx;
      const tempObj = this.test[idx];
      this.list = tempObj;
    }
  },
  created() {
    // 模拟数据
    for (let i = 0, len = 100; i < len; i++) {
      this.test.push({
        name: i,
        id: i,
        sex: i
      });
    }
  },
  mounted() {
    let temp = [];
    for (let i = 0, len = this.test.length; i < len; i += 10) {
      temp.push(this.test.slice(i, i + 10));
    }
    console.log("分页成功", temp);
    // 保存分页数据
    this.test = temp;
    // 算页数
    this.total = temp.length * 10;
    // 默认加载第一页
    this.list = this.test[this.curent];
  }
};
</script>

<style scoped>
.center {
  margin-top: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
