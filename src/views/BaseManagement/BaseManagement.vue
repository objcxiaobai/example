<template>
  <div class="common-base">
    <el-card>
      <el-table
        border
        style="width:100%"
        :data="test"
        :header-cell-style="tableCells"
        :cell-style="tableCells"
      >
        <el-table-column prop="id" label="编号"></el-table-column>
        <el-table-column label="照片">
          <template v-slot="scope">
            <div class="common-img-super">
              <img class="common-img" :src="scope.row.img" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="addClick">添加</el-button>
            <el-button type="danger" @click="deleteClick">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="40%">
      <el-form>
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
        <el-form-item label="姓名">
            <el-input></el-input>
        </el-form-item>
        <el-form-item label="地址">
            <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <div class="from-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-dialog>

    
  </div>
</template>
<script>
export default {
  name: "base-Management",
  data() {
    return {
      test: [
        {
          id: 1,
          img:
            "https://images.pexels.com/photos/939962/pexels-photo-939962.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          name: "test1",
          address: "test1"
        },
        {
          id: 2,
          img:
            "https://images.pexels.com/photos/1578281/pexels-photo-1578281.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          name: "test2",
          address: "test2"
        },
        {
          id: 3,
          img:
            "https://images.pexels.com/photos/2168218/pexels-photo-2168218.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
          name: "test3",
          address: "test3"
        }
      ],
      dialogVisible: false,

      imageUrl: "",
    };
  },
  methods: {
    //参数:
    //{row, column, rowIndex, columnIndex}
    // 修改tables样式并且加在style
    tableCells: function() {
      return "text-align:center";
    },
    addClick() {
      this.dialogVisible = !this.dialogVisible;
    },
    deleteClick() {
      this.$confirm("该操作将永久删除该内容, 是否继续？","提示",{
        confirmButtonText: "确定",
        cancelButtonText: '取消',
        type: "warning"
      })
      .then(()=>{
        this.$message({type: "success",message: "删除成功"})
      })
      .catch(()=>{
        this.$message({type:"info",message:"已取消删除"})
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
  }
};
</script>

<style scoped>
.common-img-super {
  width: 100%;
  height: 200px;
}
.common-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-uploader >>> .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
.avatar-uploader >>> .el-upload:hover {
    border-color: #409EFF;
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
.from-footer{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>