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

module.exports = {
  users: mongoose.model("users", SchemaUser),
  notices: mongoose.model("notices", SchemaNotice),
};
