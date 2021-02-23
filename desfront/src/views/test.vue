<template>
  <div id="son2Test">
    <el-form :model="uploadDataForm">
      <el-form-item label="">
        <!-- action="/api/album/upload" -->
        <el-upload
          prop="photo"
          action="/apis/upload"
          :on-success="uploadSuccess"
          :before-upload="uploadBefore"
          accept="image/*"
        >
          <el-button size="mini" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传图片，且不超过5000kb
          </div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import getAllCustomApi from "../../api/postRequest.js";

export default {
  name: "son2Test",
  data() {
    return {
      uploadDataForm: {
        photo: "",
      },
    };
  },
  mounted() {},
  created() {},
  methods: {
    uploadSuccess(res) {
      console.log(res);
      this.uploadDataForm.photo = res.data.path;
    },
    uploadBefore(file) {
      let limitMax = 5000 * 1024;
      if (file.size > limitMax) {
        this.$messageTips("大小超出限制");
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
#son2Test {
  margin-top: 100px;
}
</style>
