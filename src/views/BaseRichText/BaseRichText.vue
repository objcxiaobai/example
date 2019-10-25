<template>
  <div class="common-base">
      <RichText v-model="content"></RichText>
      <div class="common-subit">
        <el-button  type="primary"  @click="backContent">保存</el-button>
        <p>{{index}}</p>
      </div>

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
      index:-1,
    };
  },
  methods:{
    backContent:function(){
      console.log(this.index);
      if(this.index !=-1 ){
        const callBack ={
          content:this.content,
          index:this.index
        }
        Bus.$emit("rich-content",callBack);
        this.$router.go(-1);
      }
    },
  },
  watch:{
    index:function(val){
      this.index = val;
    }
  },
  mounted(){
    this.index = this.$route.query.index;
  }
};
</script>

<style scoped>
.common-base {
  background: #fff;
}
.common-subit{
  width: 100%;
  padding: 10px 10px;
}
</style>