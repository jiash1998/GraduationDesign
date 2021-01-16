var express = require("express");
var router = express.Router();
var operateDB = require("../DBOperate/operateDB");

router.get("/", (req, res) => {
  res.send("Hello");
});

router.get("/insertData", (req, res) => {
  operateDB.insert((err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: "连接错误",
      });
    }
    return res.json({
      status: "data success",
      msg: "保存成功",
    });
  });
});

router.get("/getAll", (req, res) => {
  operateDB.findAll((err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: "连接错误",
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "查询成功",
    });
  });
});

router.post("/getData", (req, res) => {
  operateDB.find(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    // console.log(data);
    return res.json({
      status: "200",
      value: data,
      msg: "保存成功",
    });
  });
});

module.exports = router;
