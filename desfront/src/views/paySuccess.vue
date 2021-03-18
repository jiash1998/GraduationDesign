<template>
  <div id="paySuccess">
    <div class="body">
      <div class="imgCon">
        <img src="../assets/img/success2.png" />
        <p>尊敬的用户，您已经支付成功。</p>
        <p>可点击按钮返回定制页面。</p>
        <div>
          <router-link
            tag="div"
            to="/merchartContral/merConManager/merConManagerOuter"
          >
            <el-button type="primary" plain size="small">返回</el-button>
          </router-link>
        </div>
      </div>
    </div>
    <public-foot-mini></public-foot-mini>
  </div>
</template>

<script>
import publicFootMini from "../components/publicFootMini.vue";
import aliPayApi from "../api/postRequest.js";

export default {
  name: "paySuccess",
  components: {
    publicFootMini,
  },
  mounted() {
    console.log(window.location.href);
    var str = window.location.href;
    str = str.match(/out_trade_no=(\S*)&method/)[1];
    console.log(str);
    this.query(str);
  },
  methods: {
    query(tradeid) {
      //VCDB09227189ZXCN20
      let data = { id: tradeid };

      aliPayApi
        .payAliQuery(data)
        .then((res) => {
          console.log(res.data.value);
          let data = res.data.value;
          aliPayApi
            .customInsertState(data)
            .then((res) => {
              console.log(res.data.value);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss">
@import "../assets/css/comCss/paySuccess.scss";
</style>
