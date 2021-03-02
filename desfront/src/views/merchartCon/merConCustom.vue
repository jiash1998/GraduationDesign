<template>
  <div id="custom">
    <div id="custom_body">
      <div class="custom_introduce">
        <div class="intro_div">
          <span id="intro_span1">ResC</span>
          <span id="intro_span2">始终强调</span>
        </div>
        <div class="test_con">
          <div class="content1">
            <div id="test1"></div>
            <div id="test2"></div>
            <div id="con_span">
              <span>定制服务</span>
            </div>
          </div>
          <div class="content2">
            <div id="test3"></div>
            <div id="test4"></div>
            <div id="con_span">
              <span>经济实惠</span>
            </div>
          </div>
          <div class="content3">
            <div id="test5"></div>
            <div id="test6"></div>
            <div id="con_span">
              <span>方便快捷</span>
            </div>
          </div>
        </div>
      </div>
      <div class="custom_fill1"></div>
      <div class="custom_fill2"></div>
      <div class="custom_user">
        <!-- <div id="user_con"></div> -->
      </div>
      <div class="custom_main">
        <div id="custom_main_con">
          <h3>系统注册</h3>
          <el-form
            :model="custom"
            ref="custom"
            :rules="rules"
            size="small"
            label-width="120px"
            label-position="left"
          >
            <el-form-item label="店铺名称" prop="name">
              <el-input
                v-model="custom.name"
                placeholder="请输入店铺名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="经营类型" prop="type">
              <!-- <el-input v-model="custom.type" placeholder="输入店铺类型，如：奶茶店、网咖、烧烤店等"></el-input> -->
              <el-radio-group v-model="custom.type" size="mini">
                <el-radio label="中小型饭店" border>中小型饭店</el-radio>
                <el-radio label="快餐汉堡店" border>快餐汉堡店</el-radio>
                <el-radio label="烧烤店" border>烧烤店</el-radio>
                <el-radio label="奶茶店" border>奶茶店</el-radio>
                <el-radio label="办公楼" border>办公楼</el-radio>
                <el-radio label="火锅店" border>火锅店</el-radio>
                <el-radio label="理发店" border>理发店</el-radio>
                <el-radio label="药店" border>药店</el-radio>
                <el-radio label="宾馆" border>宾馆</el-radio>
                <el-radio label="超市" border>超市</el-radio>
                <el-radio label="其他类型" border>其他类型</el-radio>
              </el-radio-group>
            </el-form-item>
            <div class="map-area" :id="mapId"></div>
            <el-form-item label="店铺地址" prop="address">
              <el-cascader
                :options="options"
                clearable
                v-model="custom.address"
                @change="handleChange1"
                placeholder="所在地区"
              ></el-cascader>
            </el-form-item>
            <el-form-item prop="addressDetail">
              <el-input
                v-model="custom.addressDetail"
                @change="handleChange2"
                placeholder="详细内容由街道门牌号店名组成，可参考百度地图"
              ></el-input>
            </el-form-item>
            <el-form-item label="店铺负责人" prop="header">
              <el-input
                v-model="custom.header"
                placeholder="请输入负责人姓名"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="custom.sex">
                <el-radio-button label="男"></el-radio-button>
                <el-radio-button label="女"></el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系方式(手机)" prop="phone">
              <el-input
                v-model="custom.phone"
                placeholder="请输入手机号"
              ></el-input>
            </el-form-item>
            <el-form-item label="店铺图片" prop="url">
              <div id="upload">
                <el-upload
                  prop="photo"
                  action="/apis/upload"
                  :limit="1"
                  :on-remove="uploadRemove"
                  :on-success="uploadSuccess"
                  :before-upload="uploadBefore"
                  accept="image/*"
                >
                  <el-button size="mini" type="primary" plain=""
                    >点击上传</el-button
                  >
                  <div slot="tip">
                    只能上传图片，且不超过5000KB
                  </div>
                </el-upload>
              </div>
            </el-form-item>
            <el-form-item label="社会信用代码" prop="socialCreditCode">
              <el-input
                v-model="custom.socialCreditCode"
                placeholder="请输入营业执照标注的社会信用代码"
              ></el-input>
            </el-form-item>
            <el-form-item label>
              <el-button
                type="success"
                v-model="custom.submit"
                @click="submitForm('custom')"
                >提交</el-button
              >
              <el-button type="primary" plain>返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <img :src="require('D:/GraduationPhoto/1614089772483_宾馆.jpg')"/> -->
    </div>
    <!-- <public-food></public-food> -->
    <public-foot-mini></public-foot-mini>
  </div>
</template>

<script>
import publicFootMini from "../../components/publicFootMini.vue";
import options from "../../chzu.js";
import loadBMap from "../../map";
import addCustomApi from "../../api/postRequest.js";
export default {
  name: "custom",
  components: {
    publicFootMini,
  },
  data() {
    var validateName = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写店铺名称");
      } else {
        callback();
      }
    };
    var validateType = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写商铺类型");
      } else {
        callback();
      }
    };
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        return new callback("请选择所在区域");
      } else {
        callback();
      }
    };
    var validateAddressDetail = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写详细地址");
      } else {
        callback();
      }
    };
    var validateHeader = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写真实姓名");
      } else {
        callback();
      }
    };
    var validateSex = (rule, value, callback) => {
      if (!value) {
        return new callback("请选择性别");
      } else {
        callback();
      }
    };
    var validatePhone = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写手机号");
      } else {
        callback();
      }
    };
    var validateCode = (rule, value, callback) => {
      if (!value) {
        return new callback("请填写正确的信用编码");
      } else {
        callback();
      }
    };
    return {
      rules: {
        name: [{ validator: validateName, trigger: "change" }],
        type: [{ validator: validateType, trigger: "change" }],
        address: [{ validator: validateAddress, trigger: "focus" }],
        addressDetail: [{ validator: validateAddressDetail, trigger: "focus" }],
        header: [{ validator: validateHeader, trigger: "change" }],
        sex: [{ validator: validateSex, trigger: "change" }],
        phone: [{ validator: validatePhone, trigger: "change" }],
        socialCreditCode: [{ validator: validateCode, trigger: "change" }],
      },
      custom: {
        name: "",
        type: "",
        //所在地区和详细地址
        address: "",
        addressDetail: "",
        header: "",
        user: "",
        sex: "",
        phone: "",
        photo: "",
        socialCreditCode: "",
        isCus: "未定制",
      },
      mapId: "BMap-" + parseInt(Date.now() + Math.random()),
      imgs: [],
      imgData: {
        accept: "image/gif, image/jpeg, image/png, image/jpg",
      },
      options: options,
      //记录所i在地区和详细地址
      address1: "",
      address2: "",
      customUrl: "",
    };
  },
  mounted() {
    this.initMap();
  },
  methods: {
    //图片上传
    uploadRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    uploadSuccess(res) {
      console.log(res);
      this.custom.photo = res.data.name;
      this.$message({
        message: "图片上传成功",
        type: "success",
        duration: 1800,
      });
    },
    uploadBefore(file) {
      let limitMax = 5000 * 1024;
      if (file.size > limitMax) {
        this.$messageTips("大小超出限制");
        return false;
      }
    },
    //获取address的值
    handleChange1(value) {
      value = value || "安徽省滁州市南谯区";
      this.address1 = value.join("");
    },
    handleChange2(value) {
      this.address2 = this.address1 + value;
      console.log(this.address2);
      this.initMap();
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    submitForm(formName) {
      this.$router.push("/merchartContral/merConManager/merConManagerOuter");
      this.$refs[formName].validate((val) => {
        if (val) {
          this.custom.address = this.address1;
          this.custom.user = this.$store.state.username;
          var data = this.custom;
          console.log(data);
          //提交后台
          addCustomApi.merAddCustom(data).then((res) => {
            console.log(res.data);
            this.$message({
              message: "商铺录入成功,可继续定制",
              type: "success",
              duration: 1800,
            });
            this.$refs[formName].resetFields();
          });
        } else {
          this.$message({
            message: "wait...",
            type: "warning",
            duration: 2000,
          });
          return false;
        }
      });
    },
    initMap() {
      loadBMap("faARwTpILZCsY9S5GUKe6LL2ILicSoDX")
        .then(() => {
          // 百度地图API功能
          var map = new BMap.Map(this.mapId);
          var point = new BMap.Point(118.323509, 32.282115);
          map.centerAndZoom(point, 18);
          map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
          //地址解析
          var myGeo = new BMap.Geocoder();
          // 将地址解析结果显示在地图上,并调整地图视野
          console.log(this.address2);
          let address = this.address2;
          myGeo.getPoint(
            address,
            function(point) {
              if (point) {
                map.centerAndZoom(point, 19);
                map.addOverlay(new BMap.Marker(point));
              } else {
                this.$message({
                  message: "地址未解析成功",
                  type: "error",
                  duration: 2000,
                });
              }
            },
            "滁州市"
          );
        })
        .catch((err) => {
          console.log("地图加载失败");
        });
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/css/merchartCss/merConCustom.scss";
</style>
