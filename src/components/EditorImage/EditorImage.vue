<template>
  <div class="upload-container">
    <el-button size="mini" type="primary" @click="dialogVisible = true"
      >上传</el-button
    >
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-success="handleSuccess"
        class="editor-slide-upload"
        action="#"
        list-type="picture-card"
      >
        <el-button size="samll" type="primary">Click upload</el-button>
      </el-upload>
      <div class="btns">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: "EditorImage",
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    };
  },

  methods: {
    // 判断全部文件是否上传成功
    checkAllSuccess() {
      return Object.keys(this.listObj).every(
        item => this.listObj[item].hasSuccess
      );
    },
    // 提交上传
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(item => this.listObj[item]);
      if (!this.checkAllSuccess()) {
        this.$message("请等待图片上传");
        return;
      }
      this.$emit("successCBK", arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },

    // 上传成功
    handleSuccess(response, file) {
      const uid = file.uid;
      const objKeyArr = Object.keys(this.listObj);
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file;
          this.listObj[objKeyArr[i]].hasSuccess = true;
          return;
        }
      }
    }
  }
};
</script>
<style scoped>
.upload-container {
  margin-bottom: 20px;
}

.upload-container /deep/ .el-upload--picture-card {
  width: 100%;
}

.btns {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
