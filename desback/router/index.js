var express = require("express");
var router = express.Router();
var multer = require("multer");
const fs = require("fs");
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

//根据用户名获取个人资料
router.post("/getUserByUsername", (req, res) => {
  console.log("getUserByUsername", req.body);
  operateDB.getUserByUsername(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "获取失败",
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

//修改个人资料
router.post("/updateUserByName", (req, res) => {
  console.log("updateUserByName", req.body);
  operateDB.updateUserByName(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "修改失败",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "修改成功",
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

//给用户发送通知
router.post("/addPersonalNotice", (req, res) => {
  console.log("addPersonalNotice", req.body);
  operateDB.addPersonalNotice(req.body, (err, data) => {
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

//获取所有店铺信息
router.get("/getAllCustom", (req, res) => {
  console.log("getAllCustom");
  operateDB.getAllCustom((err, data) => {
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

//根据店铺名搜索店铺
router.post("/getCustomByName", (req, res) => {
  console.log("getCustomByName", req.body);
  operateDB.getCustomByName(req.body, (err, data) => {
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

//商戶模块
//店铺注册接口
router.post("/addCustom", (req, res) => {
  console.log("addCustom", req.body);
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

//根据用户名id获取个人通知
router.post("/getByPNoticeUsername", (req, res) => {
  console.log("getByPNoticeUsername", req.body);
  operateDB.getByPNoticeUsername(req.body, (err, data) => {
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

//图片上传接口
router.post(
  "/upload",
  multer({
    //设置文件存储路径
    dest: "D:/GraduationDesign/desfront/src/assets/img/",
  }).array("file", 1),
  function (req, res, next) {
    let files = req.files;
    let file = files[0];
    let fileInfo = {};
    let path =
      "D:/GraduationDesign/desfront/src/assets/img/" +
      Date.now().toString() +
      "_" +
      file.originalname;
    console.log(path);
    fs.renameSync(
      "D:/GraduationDesign/desfront/src/assets/img/" + file.filename,
      path
    );
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = file.originalname;
    fileInfo.size = file.size;
    fileInfo.path = file.originalname;
    return res.json({
      code: 0,
      msg: "OK",
      data: fileInfo,
    });
  }
);

//获取名下所有店铺接口
router.post("/getAllCustomSelf", (req, res) => {
  console.log("getAllCustomSelf:", req.body);
  operateDB.getAllCustomSelf(req.body, (err, data) => {
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

//根据社会信用代码删除店铺
router.post("/delCustomBySocialCode", (req, res) => {
  console.log("delCustomBySocialCode:", req.body);
  operateDB.delCustomBySocialCode(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "删除失败",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "删除成功",
    });
  });
});

module.exports = router;
