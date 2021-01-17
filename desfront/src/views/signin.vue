<template>
  <div id="signin">
    <div class="signin_body">
      <div class="signin_body_main">
        <!-- 对齐方式label-position -->
        <el-form
          :model="signForm"
          :rules="rules"
          ref="signForm"
          :label-position="labelposition"
          label-width="20%"
        >
          <el-form-item label="用户名" prop="username">
            <el-input
              v-model="signForm.username"
              style="width: 80%"
              placeholder="请输入姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="signForm.password"
              show-password
              style="width: 80%"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item label>
            <el-button
              style="margin-left: 5%"
              type="success"
              plain
              @click="signin"
              >登录</el-button
            >
            <el-button type="success">
              <router-link to="/register" tag="span">注册</router-link>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <public-foot-mini></public-foot-mini>
  </div>
</template>

<script>
import comSignApi from "../api/postRequest.js";
import qs from "querystring";
import publicFootMini from "../components/publicFootMini.vue";

export default {
  name: "signin",
  components: {
    publicFootMini,
  },
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写正确的用户名");
      } else {
        callback();
      }
    };
    var validatePassword = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写正确的密码");
      } else {
        callback();
      }
    };
    return {
      rules: {
        username: [{ validator: validateUsername, trigger: "change" }],
        password: [{ validator: validatePassword, trigger: "change" }],
      },
      labelposition: "left",
      signForm: {
        username: "",
        password: "",
      },
    };
  },
  mounted() {
    // this.test();
  },

  methods: {
    signin() {
      let data = this.signForm;
      console.log(data);
      comSignApi
        .comSign(data)
        .then((res) => {
          let result = res.data;
          console.log(res);
          if ((result.msg = "查询失败" && result.value.length == 0)) {
            console.log("sign error");
            this.$message({
              message: "登录失败，请检查用户名或密码",
              type: "error",
              duration: 1500,
            });
          } else {
            console.log("sign success");
            this.$message({
              message: "登录成功！",
              type: "success",
              duration: 1500,
            });
            //成功之后将值保存在session
            //路由拦截
            sessionStorage.setItem("token", "true");
            //退出键
            sessionStorage.setItem("isExit", "true");
            //身份
            sessionStorage.setItem("username", result.value[0].username);
            sessionStorage.setItem("identity", result.value[0].identity);
            this.$router.push("/home");
            //路由刷新，搭载数据
            this.$router.go(0);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/css/comCss/signin.scss";
</style>
