<template>
  <div class="login-super">
    <div class="login-form">
      <el-form :rules="rules"
               ref="ruleForm"
               :model="ruleForm">
        <el-form-item label="账号"
                      prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="密码"
                      prop="password">
          <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary "
                     class="common-width"
                     @click="submitForm('ruleForm')">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    submitForm(fromName) {
      this.$refs[fromName].validate(valid => {
        console.log(valid);
        // 不为null
        if (valid) {
          this.$store
            .dispatch("LoginByUsername", this.ruleForm)
            .then(() => {
              this.$message.success("登录成功");
              this.$router.push("/");
            })
            .catch(err => {
              this.$message.error("账号不存在");
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
.login-super {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-form {
  width: 20%;
  height: 300px;
}
.common-width {
  width: 100%;
}
</style>
