<template>
  <div id="son9Enter">
    <div class="body">
      <div class="select">
        <el-card shadow="hover">
          <div class="storeType">
            <span>店铺类型：</span>
            <el-radio-group v-model="radio1" @change="selecType" size="small">
              <el-radio
                v-for="(item, index) in storeType"
                :key="index"
                :label="item.label"
                border
              ></el-radio>
            </el-radio-group>
          </div>
          <div class="years">
            <span>年份：</span>
            <el-radio-group v-model="radio2" @change="selectYear" size="small">
              <el-radio label="2021" border></el-radio>
              <el-radio label="2020" border></el-radio>
            </el-radio-group>
          </div>
          <div class="month">
            <span>月份：</span>
            <el-radio-group v-model="radio3" size="small" @change="selectMonth">
              <el-radio
                v-for="(item, index) in month"
                :key="index"
                :label="item.month"
                border
              ></el-radio>
            </el-radio-group>
          </div>
          <div class="operate">
            <el-button type="primary" size="small" @click="start" plain
              >查询</el-button
            >
            <el-button
              type="success"
              size="small"
              @click="insertNew(storeForm)"
              plain
              >插入店铺</el-button
            >
          </div>
        </el-card>
      </div>
      <div class="insertDiv">
        <el-card shadow="hover">
          <el-form
            :model="storeForm"
            ref="storeForm"
            :rules="rules"
            size="mini"
          >
            <el-table :data="storeForm.data" border>
              <el-table-column label="店铺">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column label="类型">
                <template slot-scope="scope">{{ scope.row.type }}</template>
              </el-table-column>
              <el-table-column label="负责人">
                <template slot-scope="scope">{{ scope.row.header }}</template>
              </el-table-column>
              <el-table-column label="联系方式">
                <template slot-scope="scope">{{ scope.row.phone }}</template>
              </el-table-column>
              <el-table-column label="月份" width="100px">
                <template slot-scope="scope">{{ scope.row.monthNum }}</template>
              </el-table-column>
              <el-table-column label="年份" width="100px">
                <template slot-scope="scope">{{ scope.row.yearNum }}</template>
              </el-table-column>
              <el-table-column label="标准值(kg)" width="100px">
                <template slot-scope="scope">{{
                  scope.row.basisGarMonth
                }}</template>
              </el-table-column>
              <el-table-column label="参考值(kg)" width="100px">
                <template slot-scope="scope">{{
                  scope.row.reference
                }}</template>
              </el-table-column>
              <el-table-column label="垃圾量(kg)" width="100px">
                <template slot-scope="scope">
                  <el-form-item
                    style="margin:0;"
                    v-if="
                      scope.row.reference != '暂无' && scope.row.tag == '未录'
                    "
                  >
                    <el-input
                      v-model="scope.row.production"
                      placeholder
                    ></el-input>
                  </el-form-item>
                  <el-form-item
                    style="margin:0;"
                    v-else-if="scope.row.reference == '暂无'"
                  >
                    <el-input
                      v-model="scope.row.production"
                      placeholder
                      disabled=""
                    ></el-input>
                  </el-form-item>
                  <span v-else>{{ scope.row.production }}</span>
                </template>
              </el-table-column>
              <el-table-column
                :filters="[
                  { text: '已录', value: '已录' },
                  { text: '未录', value: '未录' },
                ]"
                :filter-method="filterTag"
                label="标记"
                width="100px"
              >
                <template slot-scope="scope">
                  <el-tag
                    :type="scope.row.tag == '未录' ? 'warning' : 'primary'"
                    disable-transitions
                    >{{ scope.row.tag }}</el-tag
                  >
                </template>
              </el-table-column>
              <!-- <el-table-column label="操作" width="100px">
                <el-button type="success" size="mini" @click="insert(storeForm)" plain>录入数据</el-button>
              </el-table-column>-->
            </el-table>
          </el-form>
        </el-card>
        <div class="insertOpr">
          <el-button
            type="success"
            :disabled="insertBtn"
            size
            @click="insertBef(storeForm)"
            plain
            >录入数据</el-button
          >
          <download-excel
            class="export-excel-wrapper"
            :data="json_data"
            :fields="json_fields"
            title="店铺垃圾回收量细则"
            name="店铺垃圾回收量细则.xls"
          >
            <el-button lass="btn2" type="primary">
              <i class="el-icon-download"></i>
            </el-button>
          </download-excel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import getAllCustomApi from "../../api/getRequest";
import getAllStoreGarbageApi from "../../api/getRequest";
import insertGarbageBatchApi from "../../api/postRequest";
import insertGarbageApi from "../../api/postRequest";
import dealWithExcess from "../../util/dealExcess";

export default {
  name: "son9Enter",
  data() {
    var validateContent = (rule, value, callback) => {
      if (!value) {
        return new callback("请输入内容");
      } else {
        callback();
      }
    };
    return {
      rules: {
        content: [{ validator: validateContent, trigger: "change" }],
      },
      radio1: "全部",
      radio2: "2021",
      radio3: "1",
      json_fields: {
        店铺名称: "name",
        社会统一信用代码: "customId",
        店铺类型: "type",
        店铺负责人: "header",
        联系方式: "phone",
        年份: "yearNum",
        月份: "monthNum",
        垃圾回收标准量: "basisGarMonth",
        垃圾回收参考量: "reference",
        垃圾回收量: "production",
        状态: "tag",
      },
      json_data: [], //导出表格数据
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 ",
          },
        ],
      ],
      store: [],
      //录入数据按钮
      insertBtn: true,
      selectAll: { type: "", years: "" },
      //暂存数据
      stage: [],
      stageAllStore: [],
      //表单中表格数据
      storeForm: {
        data: [],
      },
      storeGar: [],
      storeType: [
        {
          label: "全部",
        },
        {
          label: "中小型饭店",
        },
        {
          label: "快餐汉堡店",
        },
        {
          label: "烧烤店",
        },
        {
          label: "奶茶店",
        },
        {
          label: "办公楼",
        },
        {
          label: "火锅店",
        },
        {
          label: "理发店",
        },
        {
          label: "药店",
        },
        {
          label: "宾馆",
        },
        {
          label: "超市",
        },
        {
          label: "其他类型",
        },
      ],
      month: [],
    };
  },
  mounted() {
    this.getAllCustomInfo();
    this.getAllStoreGarbage();
    this.selectAll = {
      type: this.radio1,
      years: this.radio2,
      month: this.radio3,
    };
    this.initRadio();
  },
  methods: {
    //店铺类型筛选
    selecType(value1) {
      this.selectAll.type = value1;
    },
    selectYear(value2) {
      this.selectAll.years = value2;
      if (this.selectAll.years == new Date().getUTCFullYear()) {
        this.month = [];
        for (let i = 0; i < new Date().getUTCMonth() + 2; i++) {
          this.month.push({ month: i + 1 + "" });
        }
      } else {
        this.month = [];
        for (let i = 0; i < 12; i++) {
          this.month.push({ month: i + 1 + "" });
        }
      }
    },
    selectMonth(value3) {
      this.selectAll.month = value3;
    },
    //准备单选数据
    initRadio() {
      if (this.selectAll.years == new Date().getUTCFullYear()) {
        this.month = [];
        for (let i = 0; i < new Date().getUTCMonth() + 2; i++) {
          this.month.push({ month: i + 1 + "" });
        }
      }
    },
    process(array, key1, key2) {
      //	用于缓存记录
      const cache = [];
      for (let t in array) {
        //	检查缓存中是否已经存在
        if (cache.find((c) => c[key1] === t[key1] && c[key2] === t[key2])) {
          // 已经存在说明之前记录过，现在这个就是多余的，直接忽略
          continue;
        }
        //	不存在就说明之前没有遇到过，把它记录下来
        cache.push(t);
      }
      // 记录结果就是过滤后的结果
      return cache;
    },
    //按照选择类型批量插入下月店铺
    insertNew() {
      var radioGroup = this.selectAll;
      var arr = [];
      //全部插入
      if (radioGroup.type == "全部") {
        // console.log("this.storeForm.data",this.storeForm.data);

        for (const i of this.stageAllStore) {
          let obj = {
            customId: i.customId,
            type: i.type,
            monthNum: radioGroup.month,
            excess: null,
            money: null,
            production: "",
            yearNum: radioGroup.years,
          };
          arr.push(obj);
        }
        console.log("arr storeForm", arr, this.storeForm.data);
        //@@@筛查还未存在的店铺@@@
        for (let j = 0, len = this.storeForm.data.length; j < len; j++) {
          for (let i = 0, len2 = arr.length; i < len2; i++) {
            if (
              this.storeForm.data[j].customId == arr[i].customId &&
              this.storeForm.data[j].monthNum == arr[i].monthNum &&
              this.storeForm.data[j].yearNum == arr[i].yearNum
            ) {
              arr.splice(i, 1);
              len2 = arr.length;
            }
          }
        }
        console.log("arr", arr);
      }
      //按选择类型插入
      else {
        for (const i of this.stageAllStore) {
          if (i.type == radioGroup.type) {
            let obj = {
              customId: i.customId,
              monthNum: radioGroup.month,
              excess: null,
              money: null,
              production: "",
              yearNum: radioGroup.years,
            };
            arr.push(obj);
          }
        }
      }
      console.log("插入店铺All", this.stageAllStore);
      console.log("插入店铺storeform", this.storeForm.data);
      if (this.storeForm.data.length === this.stageAllStore.length) {
        console.log("all");
        this.$message({
          type: "warning",
          message: "已插入全部店铺数据",
          duration: 1800,
        });
      } else {
        var postData = {
          productions: arr,
        };
        console.log("postdata", postData);

        insertGarbageBatchApi
          .insertGarbageCustom(postData)
          .then((res) => {
            console.log(res);

            if (res.data.msg === "保存成功") {
              this.$message({
                type: "success",
                message: "插入店铺数据成功",
                duration: 1500,
              });
              this.getAllStoreGarbage();
            } else {
              this.$message({
                type: "warning",
                message: "暂无店铺可插入",
                duration: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
    //录入前处理
    insertBef(form) {
      this.stage = [];
      //计算超出量
      console.log("orm", form.data);
      for (const i of form.data) {
        if (i.tag === "未录" && i.reference != "暂无" && i.production != "") {
          let item = dealWithExcess.calcAll(i);
          i.excessGar = item.excessGar;
          i.excessMoney = item.excessMoney;
          this.stage.push(i);
        }
      }
      console.log("stage", this.stage);
      let res = this.stage.every((item) => {
        return item.reference == "暂无" || item.production == "";
      });
      if (res) {
        this.$message({
          type: "error",
          message: "无法录入！请确保参考量和垃圾同时存在",
          duration: 1600,
        });
        return;
      } else {
        this.insert(this.stage);
        console.log("ok");
      }
    },
    //店铺垃圾量录入
    insert(val) {
      var data = val;
      var productions = [];
      console.log("insertdata", data);

      for (const i of data) {
        let obj = {
          customId: i.customId,
          type: i.type,
          excess: i.excessGar,
          money: i.excessMoney,
          monthNum: i.monthNum,
          production: i.production,
          reference: i.reference,
          yearNum: i.yearNum,
          _id: i._id,
        };
        productions.push(obj);
      }
      console.log("productions", productions);
      //检查页面是否有要录入的内容
      var postData = {
        productions: productions,
      };
      if (productions.length > 0) {
        insertGarbageBatchApi
          .insertGarbageBatch(postData)
          .then((res) => {
            console.log(res.data);
            if (res.data.msg == "保存错误") {
              this.$message({
                type: "error",
                message: "录入异常",
                duration: 1600,
              });
            } else {
              this.getAllStoreGarbage();
              this.$message({
                type: "success",
                message: "录入店铺数据成功",
                duration: 1500,
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this.$message({
          type: "warning",
          message: "无可录入内容",
          duration: 1500,
        });
      }
    },
    //表格筛选
    filterTag(value, row) {
      return row.tag === value;
    },
    //开始查询
    start() {
      if (this.selectAll.type === "全部") {
        this.storeForm.data = [];
        for (const i of this.storeGar) {
          if (
            this.selectAll.years == i.yearNum &&
            this.selectAll.month == i.monthNum
          ) {
            this.storeForm.data.push(i);
          }
        }
      } else {
        this.storeForm.data = [];
        for (const i of this.storeGar) {
          if (
            this.selectAll.type == i.type &&
            this.selectAll.years == i.yearNum &&
            this.selectAll.month == i.monthNum
          ) {
            this.storeForm.data.push(i);
          }
        }
      }
      console.log("storeForm", this.storeForm.data);
      this.json_data = this.storeForm.data;
      if (this.storeForm.data.length === 0) {
        this.insertBtn = true;
        this.$message({
          type: "error",
          message: "暂无任何店铺信息，可选择插入",
          duration: 1800,
        });
      } else {
        this.insertBtn = false;
      }
    },
    //获取全部店铺
    async getAllCustomInfo() {
      await getAllCustomApi
        .getAllCustom()
        .then((res) => {
          console.log("getallcustom", res);
          for (const i of res.data.value) {
            let obj = {
              customId: i.socialCreditCode,
              name: i.name,
              type: i.type,
              header: i.header,
              phone: i.phone,
            };
            if (i.isCus === "已定制") {
              this.stageAllStore.push(obj);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取垃圾产生表
    async getAllStoreGarbage() {
      await getAllStoreGarbageApi
        .getAllStoreGarbage()
        .then((res) => {
          this.storeGar = res.data.value;
          for (const i of this.storeGar) {
            if (i.production != "") {
              i.tag = "已录";
            } else {
              i.tag = "未录";
            }

            if (i.reference === "0") {
              i.reference = "暂无";
            }
          }
          console.log("storeGar", this.storeGar);
          this.start();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/css/adminCss/adminEnter.scss";
</style>
