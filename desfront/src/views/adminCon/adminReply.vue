<template>
  <div id="Son7_1Replay">
    <div class="body">
      <el-card shadow="hover">
        <el-table ref="replay" :data="replay">
          <el-table-column label="用户名" prop="username"></el-table-column>
          <el-table-column label="反馈内容" prop="feedbackContent"></el-table-column>
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
      </el-card>
    </div>
  </div>
</template>

<script>
import getAllReplyApi from "../../api/getRequest.js";

export default {
  name: "Son7_1Replay",
  data() {
    return {
      replay: [],
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    getInfo() {
      getAllReplyApi
        .getAllReply()
        .then((res) => {
          console.log("res", res.data.value);
          this.replay = res.data.value;
          console.log("relpay", this.replay);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/adminCss/adminReply.scss";
</style>
