<template>
  <div id="son7Feedback">
    <div class="body">
      <el-card shadow="hover">
        <el-table ref="feedback" :data="feedback">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="username" label="反馈用户"></el-table-column>
          <el-table-column
            prop="feedbackContent"
            label="反馈内容"
          ></el-table-column>
          <el-table-column
            prop="feedbackDate"
            sortable
            label="反馈时间"
          ></el-table-column>
          <el-table-column
            prop="state"
            width="120"
            label="状态"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                v-if="scope.row.state != '未回复'"
                size="small"
                disabled
                >回复</el-button
              >
              <el-button
                type="primary"
                v-else
                plain
                size="small"
                @click="replayInfo(scope.row)"
                >回复</el-button
              >
              <el-button
                type="danger"
                :disabled="scope.row.state == '未回复' ? !delBtn : delBtn"
                @click.native="delRow(scope.row)"
                size="small"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <div class="operate">
        <el-button type="primary" @click="get">选中删除</el-button>
      </div>
      <div>
        <el-dialog title :visible.sync="dialogVisible" width="40%">
          <el-form :model="replay" ref="replay" :rules="rules">
            <el-form-item label prop="content">
              <el-input
                v-model="replay.replyContent"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label>
              <el-button type="primary" @click="replayBtn('replay')" plain
                >发送</el-button
              >
            </el-form-item>
          </el-form>
          <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span> -->
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import getAllFeedbackApi from "../../api/getRequest.js";
import replayFeedbackApi from "../../api/postRequest.js";
import delFeedbackByIdApi from "../../api/postRequest.js";

export default {
  name: "son7Feedback",
  data() {
    var validateContent = (rule, value, callback) => {
      if (!value) {
        return new callback("请输入内容");
      } else {
        callback();
      }
    };
    return {
      //rules
      rules: {
        replyContent: [{ validator: validateContent, trigger: "change" }],
      },
      feedback: [],
      //回复按钮展示
      isShow: "未回复",
      //删除键是否有用
      delBtn: false,
      //存放删除的id
      delId: [],
      //回复框是否开启
      dialogVisible: false,
      //回复表单，
      // 需要fbId(反馈id)、username(用户名)、content(内容)、admin(站长)
      replay: {
        feedbackId: "",
        replyId: "",
        replyContent: "",
        replyDate: "",
        username: "",
      },
    };
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    //回复,遮盖
    replayInfo(index) {
      this.dialogVisible = !this.dialogVisible;
      console.log(index);
      //点击回复某个之后，将携带信息
      this.replay = {
        feedbackId: index.feedbackId,
        username: index.username,
      };
    },
    //回复，按钮
    replayBtn(formname) {
      var data = this.replay;
      console.log(data);

      this.$refs[formname].validate((val) => {
        if (val) {
          replayFeedbackApi
            .replayFeedback(data)
            .then((res) => {
              console.log(res.data);
              if (res.data.msg == "发送成功") {
                this.$message({
                  message: "回复成功",
                  type: "success",
                  duration: 1500,
                });
                this.getInfo();
                this.dialogVisible = false;
              } else {
                this.$message({
                  message: "回复失败",
                  type: "error",
                  duration: 1500,
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          alert("请认真填写反馈信息");
        }
      });
    },
    //删除某一行
    delRow(index) {
      var id = { replyId: index.replyId };
      console.log(id);

      delFeedbackByIdApi
        .delFeedbackById(id)
        .then((res) => {
          console.log(res.data);
          if (res.data.msg == "删除成功") {
            this.$message({
              message: "删除成功",
              type: "success",
              duration: 1500,
            });
            this.getInfo();
          } else {
            this.$message({
              message: "删除失败",
              type: "error",
              duration: 1500,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    /**
     * get批量逻辑删除
     */
    get() {
      //获取table的选中数据对应数据库id
      this.delId = [];
      for (const i of this.$refs.feedback.selection) {
        if (i.state == "未回复") {
          this.$message({
            message: "包含未回复信息，请及时回复",
            type: "warning",
            duration: 1500,
          });
        } else {
          // var ids = { replyId: i.replyId.toString() }
          this.delId.push(i);
        }
      }
      // for (const i of this.$refs.feedback.selection) {
      //   this.delId.push({replyId:i.replyId});
      // }
      // var ids = { id: this.delId.toString() };
      console.log(this.delId);
      for (const i of this.delId) {
        delFeedbackByIdApi
          .delFeedbackBatch(i)
          .then((res) => {
            console.log(res.data);
            if (res.data.msg == "删除成功") {
              this.$message({
                message: "删除成功",
                type: "success",
                duration: 1500,
              });
              this.getInfo();
            } else {
              this.$message({
                message: "删除失败",
                type: "error",
                duration: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
      console.log("len", this.delId.length);
    },
    //获取反馈
    getInfo() {
      getAllFeedbackApi
        .getAllFeedBack()
        .then((res) => {
          console.log(res.data.value);
          this.feedback = res.data.value;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/adminCss/adminFeedback.scss";
</style>
