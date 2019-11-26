<template>
  <div class="tags">
    <div class="tags-content">
      <p>{{ tabsTitles }}</p>
    </div>
    <div class="tags-admin">
      <p>{{ name }}</p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsTitles: "",
      name: ""
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
  },
  mounted() {
    this.name = sessionStorage.getItem("my_username");
  }
};
</script>

<style scoped>
.tags {
  height: 50px;
  overflow: hidden;
  background: #fff;
  width: calc(100% - 200px);
  margin-left: 200px;
  box-shadow: -5px 50px 40px #000;
  display: flex;
  justify-content: space-between;
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
.tags-admin {
  align-self: flex-end;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 0 20px;
}
</style>
