var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/GraduationBase", {
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
  email:{
    type:String,
    default:""
  },
  phone: {
    type: String,
    default: "",
  },
  identity: {
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
    default: "",
  },
  type: {
    type: String,
    default: "",
  },
  time: {
    type: Date,
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
  address_detail: {
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
  social_credit_code: {
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
  cycle_times: {
    type: String,
    default: "",
  },
  cycle_date: {
    type: String,
    default: "",
  },
  sustain_month: {
    type: String,
    default: "",
  },
  pay_type: {
    type: String,
    default: "",
  },
});

//反馈表
var SchemaFeedback = new Schema({
  username: {
    type: String,
    required: true,
  },
  feedback_date: {
    type: String,
    required: true,
    default: "",
  },
  content: {
    type: String,
    default: "",
  },
  state: {
    type: String,
    default: "",
  },
  deleted: {
    type: String,
    default: "",
  },
});

module.exports = {
  users: mongoose.model("users", SchemaUser),
  notices: mongoose.model("notices", SchemaNotice),
};
