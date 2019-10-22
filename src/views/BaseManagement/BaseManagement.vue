<template>
  <div class="common-base">
    <div class="common-add">
      <el-button type="primary"  @click="addClick">添加</el-button>
    </div>
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
        <el-table-column label="操作" >
          <template v-slot="scope">
            <el-button type="text" @click="lookLog(scope.$index,scope.row)">查看</el-button>
            <el-button id="x-button--text" type="text" @click="deleteClick">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 添加 -->
    <el-dialog title="添加" :visible.sync="dialogVisible" width="40%">
        <base-form v-on:cancel-dialog="cancelDialogVisible" ></base-form>
    </el-dialog>

    <!-- 查看 -->
    <el-dialog title="查看" :visible.sync="lookLogVisible" width="40%">
        <base-form  :item="itemObj" v-bind:current="idx" v-on:cancel-dialog="cancelLookDialog"
        v-on:success-dialog="submitEdit"
        ></base-form>
    </el-dialog>

  </div>
</template>
<script>
import BaseForm from '@/components/BaseForm/BaseForm.vue';
export default {
  name: "base-Management",
  components:{
    BaseForm
  },
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
      lookLogVisible:false,

      itemObj:{},
      idx:0
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
    lookLog(index,value){
      this.itemObj = JSON.parse(JSON.stringify(value));
      this.idx = index;
      this.lookLogVisible = !this.lookLogVisible;
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
    // 打开编辑
    cancelDialogVisible(e){
        this.dialogVisible = e;
    },
    // 打开查看
    cancelLookDialog(e){
        this.lookLogVisible = e;
    },
    // 编辑
    submitEdit(e,index){
      console.log(e,index);
      const obj = e;
      // 犯了经典错误,不能通过test[index]修改内容，视图不会更新的！！！
      this.test.splice(index,1,obj);
      this.lookLogVisible = false;
    }

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

.common-add{
  overflow: hidden;
  margin: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

#x-button--text{
  color: #f56c6c !important; 
}

</style>