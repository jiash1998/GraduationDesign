var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/GraduationBase", {
  // 新的服务器发现和监视引擎 和url解析器 未来会弃用
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Schema = mongoose.Schema;

console.log("connect");
/**公共模块 */
//用户表
var SchemaUser = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    default: "",
  },
  email: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  identity: {
    type: String,
    defalut: "",
  },
  cus: {
    type: Number,
    defalut: 0,
  },
  isCused: {
    type: Number,
    defalut: 0,
  },
});

//驾驶员表
var SchemaDriver = new Schema({
  username: {
    type: String,
    required: true,
  },
  routeFlag: {
    type: String,
    defalut: "",
  },
});

//公告表
var SchemaNotice = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  tip: {
    type: String,
    default: "0",
  },
  inputvalue: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  time: {
    type: String,
  },
});

//商户定制表
var SchemaCustom = new Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    default: "",
  },
  address: {
    type: String,
    default: "",
  },
  addressDetail: {
    type: String,
    default: "",
  },
  header: {
    type: String,
    default: "",
  },
  sex: {
    type: String,
    default: "",
  },
  socialCreditCode: {
    type: String,
    default: "",
  },
  user: {
    type: String,
    default: "",
  },
  phone: {
    type: String,
    default: "",
  },
  photo: {
    type: String,
    default: "",
  },
  basisGarMonth: {
    type: String,
    defalut: "",
  },
  cycleTimes: {
    type: String,
    default: "",
  },
  cycleDate: {
    type: String,
    default: "",
  },
  sustainMonth: {
    type: String,
    default: "",
  },
  payType: {
    type: String,
    default: "",
  },
  money: {
    type: String,
    default: "",
  },
  send_pay_date: {
    type: String,
    default: "",
  },
  trade_no: {
    type: String,
    default: "",
  },
  isCus: {
    type: String,
    default: "",
  },
});

//驾驶员通知表
var SchemaNoticeDriver = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  time: {
    type: String,
    required: true,
    default: "",
  },
});

//GPS表
var SchemaLatAndLon = new Schema({
  driver: {
    type: String,
    required: true,
  },
  lon: {
    type: String,
    required: true,
  },
  lat: {
    type: String,
    required: true,
    default: "",
  },
  time: {
    type: String,
    required: true,
    default: "",
  },
});

//个人通知表
var SchemaNoticeSelf = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    default: "个人通知",
  },
  content: {
    type: String,
    required: true,
    default: "",
  },
  noticeSelfDate: {
    type: String,
    required: true,
    default: "",
  },
});

//管理员回复和用户反馈表
var SchemaFeedbackAndReply = new Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    default: "用户反馈",
  },
  feedbackContent: {
    type: String,
    default: "",
  },
  feedbackDate: {
    type: String,
    // required: true,
    default: "",
  },
  feedbackId: {
    type: String,
    default: "",
  },
  replyContent: {
    type: String,
    default: "",
  },
  replyDate: {
    type: String,
    // required: true,
    default: "",
  },
  replyId: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "未回复",
  },
  deleted: {
    type: String,
    default: "1",
  },
});

//垃圾表
var SchemaGarbageSec = new Schema({
  garbage_id: {
    type: String,
  },
  garbage_name: {
    type: String,
    default: "",
  },
  classify_id: {
    type: String,
    default: "",
  },
});

//垃圾分类表
var SchemaGarbageType = new Schema({
  classify_id: {
    type: String,
    default: "",
  },
  classify_name: {
    type: String,
  },
  explains: {
    type: String,
    default: "",
  },
});

//垃圾月产量表
SchemaGarbageMonth = new Schema({
  customId: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  monthNum: {
    type: String,
    default: "",
  },
  yearNum: {
    type: String,
    default: "",
  },
  production: {
    type: String,
    default: "",
  },
  reference: {
    type: String,
    default: "0",
  },
});

//垃圾年产量总表

module.exports = {
  users: mongoose.model("users", SchemaUser),
  drivers: mongoose.model("drivers", SchemaDriver),
  notices: mongoose.model("notices", SchemaNotice),
  noticeselfs: mongoose.model("noticeselfs", SchemaNoticeSelf),
  noticedrivers: mongoose.model("noticedrivers", SchemaNoticeDriver),
  latandlons: mongoose.model("latandlons", SchemaLatAndLon),
  customs: mongoose.model("customs", SchemaCustom),
  feedbackandreplys: mongoose.model(
    "feedbackandreplys",
    SchemaFeedbackAndReply
  ),
  // replys: mongoose.model("replys", SchemaReply),
  garbagesecs: mongoose.model("garbagesecs", SchemaGarbageSec),
  garbagetypes: mongoose.model("garbagetypes", SchemaGarbageType),
  garbagemonths: mongoose.model("garbagemonths", SchemaGarbageMonth),
};
