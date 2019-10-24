<template>
  <div class="common-base">
      <RichText v-model="content"></RichText>
      
      <el-button @click="backContent"></el-button>
  </div>
</template>

<script>
import Bus from '@/utils/bus.js'
import RichText from "@/components/RichText/RichText.vue";
export default {
  name: "base-rich-text",
  components: {
    RichText
  },
  data() {
    return {
      content:"",
    };
  },
  methods:{
    backContent:function(){
      console.log("从组件回来",this.content)
    },
  },



  mounted(){
    Bus.$on('index',e=>{
      console.log(e);
    })
  }
};
</script>

<style scoped>
.common-base {
  background: #fff;
}
</style>