<template>
  <div class="tags">
    <div class="tags-content">
      <p>{{ tabsTitles }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsTitles: ""
    };
  },
  methods: {
    setTags(route) {
      this.tabsTitles = route.meta.title;
    }
  },
  watch: {
    $route(newValue) {
      this.setTags(newValue);
    }
  },
  created() {
    this.setTags(this.$route);
  }
};
</script>

<style scoped>
.tags {
  height: 50px;
  overflow: hidden;
  background: rgba(247, 252, 255, 1);
  width: calc(100% - 200px);
  margin-left: 200px;
}
.tags-content {
  width: 120px;
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(17, 19, 20, 1);
}
</style>
