var express = require("express");
var router = express.Router();
var operateDB = require("../DBOperate/operateDB");

router.get("/", (req, res) => {
  res.send("Hello");
});

//公共模块
//登录接口
router.post("/sign", (req, res) => {
  operateDB.signin(req.body, (err, data) => {
    if (err || data.length === 0) {
      return res.json({
        status: 200,
        value: data,
        msg: "查询失败",
      });
    }
    return res.json({
      status: 200,
      value: data,
      msg: "查询成功",
    });
  });
});

//注册接口
router.post("/register", (req, res) => {
  console.log(req.body);
  operateDB.register(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "保存成功",
    });
  });
});

//商戶模块
//店铺注册接口
router.post("/addCustom", (req, res) => {
  console.log(req.body);
  operateDB.addCustom(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "保存成功",
    });
  });
});

//获取名下所有店铺接口
router.post("/getAllCustom", (req, res) => {
  console.log("body:",req.body);
  operateDB.getAllCustom(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "获取成功",
    });
  });
});

//发送商户反馈接口
router.post("/addFeedback", (req, res) => {
  console.log("body:", req.body);
  operateDB.addFeedback(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "获取成功",
    });
  });
});

module.exports = router;
