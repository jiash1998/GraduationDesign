<template>
  <div id="Son7_1Replay">
    <div class="body">
      <el-card shadow="hover">
        <el-table :data="replay">
          <el-table-column
            label="用户名"
            prop="replay.username"
          ></el-table-column>
          <el-table-column
            label="反馈内容"
            prop="replay.content"
          ></el-table-column>
          <el-table-column
            label="反馈时间"
            sortable
            prop="replay.feedbackDate"
          ></el-table-column>
          <el-table-column
            label="回复内容"
            prop="reply.content"
          ></el-table-column>
          <el-table-column
            label="回复时间"
            sortable
            prop="reply.replyTime"
          ></el-table-column>
          <el-table-column label="操作员" prop="reply.admin"></el-table-column>
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
          console.log(res.data.value);
          let arr = res.data.value;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].state == "未回复") {
              this.replay[i] = arr[i];
            }
          }
          console.log(this.replay);
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
