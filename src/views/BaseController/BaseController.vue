<template>
  <div>
    <p>我是加载进来的首页{{ isB }}</p>
  </div>
</template>
<script>
export default {
  name: "base-controller",
  data() {
    return {
      isB: ""
    };
  },
  mounted() {
    const test = "admin";
    this.isB = test.indexOf("admin") >= 0;
  }
};
</script>
<style scoped></style>
