var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/GraduationBase", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Schema = mongoose.Schema;

console.log("connect");
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

module.exports = {
  users: mongoose.model("users", SchemaUser),

};
