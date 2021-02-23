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

//获取所有用户
router.get("/getAllNotice", (req, res) => {
  console.log("getAllNotice");
  operateDB.getAllNotice((err, data) => {
    if (err) {
      return res.json({
        status: "获取错误",
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

//管理员模块
//发送公告
router.post("/insertNotice", (req, res) => {
  console.log("insertNotice", req.body);
  operateDB.insertNotice(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "保存错误",
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

//获取所有用户
router.get("/getAllUser", (req, res) => {
  console.log("getAllUser");
  operateDB.getAllUser((err, data) => {
    if (err) {
      return res.json({
        status: "获取错误",
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

//获取用户反馈
router.get("/getAllFeedBack", (req, res) => {
  console.log("getAllFeedBack");
  operateDB.getAllFeedBack((err, data) => {
    if (err) {
      return res.json({
        status: "获取错误",
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

//获取以处理的用户反馈
router.get("/getAllReply", (req, res) => {
  console.log("getAllReply");
  operateDB.getAllReply((err, data) => {
    if (err) {
      return res.json({
        status: "获取错误",
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

//注册驾驶员
router.post("/addDriver", (req, res) => {
  console.log(req.body);
  operateDB.addDriver(req.body, (err, data) => {
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
  console.log("addCustom",req.body);
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
  console.log("getAllCustom:", req.body);
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
  console.log("addFeedback:", req.body);
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
