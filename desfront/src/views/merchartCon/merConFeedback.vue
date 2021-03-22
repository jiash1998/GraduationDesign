<template>
  <div id="son3Feedback" :style="backgroundDiv">
    <div class="body">
      <div class="feedbackForm">
        <el-form :model="feedback" :rules="feedback" refs="feedback">
          <el-form-item label>
            <el-input
              v-model="feedback.feedbackContent"
              type="textarea"
              placeholder="填写你想反馈的意见或者建议"
            ></el-input>
            <el-button
              type="primary"
              size="small"
              @click="postFeedback(vm)"
              plain
              >发送</el-button
            >
            <el-button type="success" size="small">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="instructions">
        <h4>反馈须知：</h4>
        <p v-for="(item, index) in instructions" :key="index">{{ item }}</p>
      </div>
    </div>
    <div id="foot">
      <el-card shadow="hover">
        <div class="title">
          <h4 id="titleP">💌反馈详情</h4>
          <el-table ref="reply" :data="reply">
            <el-table-column
              label="反馈内容"
              prop="feedbackContent"
            ></el-table-column>
            <el-table-column
              label="反馈时间"
              sortable
              prop="feedbackDate"
            ></el-table-column>
            <el-table-column
              el-table-column
              label="回复内容"
              prop="replyContent"
            ></el-table-column>
            <el-table-column
              label="回复时间"
              sortable
              prop="replyDate"
            ></el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
    <public-foot-mini></public-foot-mini>
  </div>
</template>

<script>
import publicFootMini from "../../components/publicFootMini.vue";
import addFeedbackApi from "../../api/postRequest.js";
import getAllReplyApi from "../../api/getRequest.js";
import { debounce } from "../../util/debounce";

export default {
  name: "son3Feedback",
  components: {
    publicFootMini,
  },
  data() {
    return {
      backgroundDiv: {
        backgroundImage: "url(" + require("../../assets/img/email.png") + ")",
        backgroundRepeat: "no-repeat",
        backgroundSize: "20% 20%",
        backgroundPosition:"75% 30%"
      },
      instructions: [
        "1.如有意见请如实反馈，请不要出现不文明用语，否则后果自负",
        "2.发送反馈之后，一般1-3个工作日内会收到回复邮件",
        "3.如果情况紧急，请拨打电话：17856006144，负责人：顾一",
      ],
      feedback: {
        username: "",
        feedbackContent: "",
        feedbackDate: "",
        feedbackId: "",
      },
      vm: this,
      reply: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    postFeedback: debounce(
      (vm) => {
        let DATE = new Date();
        vm.feedback.username = sessionStorage.getItem("username");
        vm.feedback.feedbackDate =
          DATE.getFullYear() +
          "-" +
          (DATE.getMonth() + 1) +
          "-" +
          DATE.getDate();
        vm.feedback.feedbackId =
          DATE.getTime() + sessionStorage.getItem("username");
        var data = vm.feedback;
        console.log("Feedbackdata", data);
        addFeedbackApi
          .addFeedback(data)
          .then((res) => {
            console.log(res);
            vm.$message({
              message: "发送成功",
              type: "success",
              duration: 1800,
            });
          })
          .catch((err) => {
            console.log(err);
            vm.$message({
              message: "发送失败",
              type: "error",
              duration: 1800,
            });
          });
      },
      3000,
      true
    ),
    getInfo() {
      getAllReplyApi
        .getAllReply()
        .then((res) => {
          console.log("res", res.data.value);
          this.reply = res.data.value;
          console.log("relpay", this.reply);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/merchartCss/merConFeedback.scss";
</style>
