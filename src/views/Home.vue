<template>
  <div class="container">
    <nav-bar></nav-bar>
    <tags></tags>
    <div class="content-box">
      <div class="content">
        <router-view :key="key"></router-view>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar/NavBar.vue";
import Tags from "@/components/Tags/Tags.vue"
export default {
  name: "home",
  components: {
    NavBar,
    Tags
  },
  computed:{
    key(){
      return this.$route.path
    }
  }
};
</script>
