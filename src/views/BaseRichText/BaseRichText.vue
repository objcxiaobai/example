<template>
  <div class="common-base">
    <RichText v-model="content"></RichText>
    <div class="common-subit">
      <el-button type="primary" @click="backContent">保存</el-button>
    </div>
  </div>
</template>

<script>
import RichText from "@/components/RichText/RichText.vue";
import Bus from "@/utils/bus.js";
export default {
  name: "base-rich-text",
  components: {
    RichText
  },
  data() {
    return {
      content: "",
      index: -1
    };
  },
  methods: {
    backContent: function() {
      if (this.index != -1) {
        this.$router.go(-1);
      }
    }
  },
  watch: {
    index: function(val) {
      this.index = val;
    }
  },
  mounted() {
    this.index = this.$route.query.index;
  },

  destroyed() {
    this.$bus.$emit("success-content", this.content, this.index);
  }
};
</script>

<style scoped>
.common-base {
  background: #fff;
}
.common-subit {
  width: 100%;
  padding: 10px 10px;
}
</style>
