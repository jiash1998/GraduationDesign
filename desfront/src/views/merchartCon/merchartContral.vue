<template>
  <div id="merchartContral">
    <div class="contralHead">
      <el-menu :default-active="setIndex" mode="horizontal" @select="getIndex">
        <el-menu-item index="1">
          <router-link to="/merchartContral/merConCustom" tag="div">定制服务</router-link>
        </el-menu-item>
        <el-menu-item index="2">
          <router-link to="/merchartContral/merConManager" tag="div">定制管理</router-link>
        </el-menu-item>
        <el-menu-item index="3">
          <router-link to="/merchartContral/merConFeedback" tag="div">反馈信息</router-link>
        </el-menu-item>
      </el-menu>
    </div>
    <div>
      <!-- <keep-alive> -->
        <router-view />
      <!-- </keep-alive> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "merchartContral",
  data() {
    return {
      setIndex: sessionStorage.getItem("index")
    };
  },
  mounted() {
    // this.setIndex = sessionStorage.getItem("index");
    // console.log(this.setIndex,"index");
  },
  methods: {
    getIndex(key) {
      sessionStorage.setItem("index", key);
    }
  },
  destroyed() {
    sessionStorage.removeItem("index");
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/merchartCss/merchartContral.scss";
</style>