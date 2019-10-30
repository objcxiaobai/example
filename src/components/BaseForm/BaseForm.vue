<template>
  <el-form :model="fromItem">
    <el-form-item label="上传图片">
      <el-upload
        class="avatar-uploader"
        action="#"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="姓名" label-width="60px">
      <el-col :span="14">
        <el-input v-model="fromItem.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="地址" label-width="60px">
      <el-col :span="14">
        <el-input v-model="fromItem.address"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="24"></el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="24"></el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="24" class="from-footer">
        <el-button @click="cancelDiaLog">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </el-col>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: "base-form",
  props: {
    item: {
      type: Object,
      default: function() {
        return {
          img: "",
          name: "",
          address: ""
        };
      }
    },
    current: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      imageUrl: "",
      fromItem: this.item,
      currentIndex: this.current
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    cancelDiaLog() {
      this.$emit("cancel-dialog", false);
    },
    submit() {
      if (this.currentIndex === undefined) {
        console.log("this", this.currentIndex);
        this.$emit("success-dialog", this.fromItem);
        return;
      }
      this.$emit("success-dialog", this.fromItem, this.currentIndex);
    }
  },

  // 监听值的变化
  watch: {
    // 监听对象
    item: {
      handler(newVal) {
        this.fromItem = newVal;
      },
      deep: true
    },
    // 监听图片发生变化
    "item.img": function(newVal) {
      if (newVal != "") {
        this.imageUrl = newVal;
      }
    },
    // 监听number
    current: {
      handler(newVal) {
        this.currentIndex = newVal;
      }
    }
  },
  mounted() {
    // 第一次加载的时候默认给,随后会调用watch
    if (this.item.img != "") {
      this.imageUrl = this.item.img;
    }
  }
};
</script>

<style scoped>
.avatar-uploader >>> .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader >>> .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.from-footer {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>
