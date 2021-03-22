var express = require("express");
var router = express.Router();
var multer = require("multer");
const fs = require("fs");
const path = require("path");
const request = require("request");
var operateDB = require("../DBOperate/operateDB");
var AllDB = require("../DBOperate/connectDB");

//店铺全局对象
let customObj = {
  socialCreditCode: "",
  cycleTimes: "",
  cycleDate: "",
  sustainMonth: "",
  payType: "",
  money: "",
  send_pay_date: "",
  trade_no: "",
  isCus: "",
};

router.get("/", (req, res) => {
  res.send("Hello");
});

//alipay
const AlipaySdk = require("alipay-sdk").default;
const AlipayFormData = require("alipay-sdk/lib/form").default;
// const { default: AliPayForm } = require("alipay-sdk/lib/form");

//支付
router.post("/payAli", async (req, res) => {
  const alipaySdk = new AlipaySdk({
    appId: "2021000117621383", // 开放平台上创建应用时生成的 appId
    signType: "RSA2", // 签名算法,默认 RSA2
    gateway: "https://openapi.alipaydev.com/gateway.do", // 支付宝网关地址 ，沙箱环境下使用时需要修改
    timeout: 5000,
    alipayPublicKey:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh2x1ppHmer4WTi/Hr0HUIyfT6Z12nJ4vxC8cBIqqnTMeqIQKx73qjKjA++10EVNN6lNdBzYVtDiJyWmjL/JxIGb0e30+C0nMUTT7gYNEiY9lSuCbEBzvmf3P1iQsXVDVMvs3msbqUkNCk/Ni0UsKEkH/Fj8tQd+f6xqqimN/t5ULTn58Q/zBJ5uS9bqaKWlRIg52ROrvbOElvXIoCu1J8sfyVRGuHh7d2f9VHB7ZmOCs/i7D6j3Un09hp5nJ5DyPsC6yU+W7NtlCIoqE8e1nALGtctLiDJXaffj6JP66h4YkBI+F08OxIE8hv89YUdZAS3+8RdgVSfCE4cWCszC7GQIDAQAB",
    // 支付宝公钥，需要对结果验签时候必填
    privateKey:
      "MIIEpAIBAAKCAQEAxoQNPEDGiyrbQSyXnXTQSZEHzFqnXfkv5HetYisJ6MC0CRykyh6QtarYR4pgMUO2msDxajIQzu5x64zCsyXo312gIme8nEOr0gjZ9I5OjgD8vkIrGmRZq8SHEom4ecgtCBs/0QkoITivj0Oibk6D4TdHEElUZg53ruAGeAvm1ImLIbAbzktAjMANUoER7CLJICk2AH+NL3wxPNlzzzY8kXkNYbaNjOQUnTwi6RXbWUuaObLR2AWni3jcOly5a90FADip+vGddJgQbQURQXXKAwRx0j6EdU0PgDqJWiGcy56vbNlOu9H+qPSbQLJq4QjJBCJ5JzeucqQclHRjwy6IxQIDAQABAoIBAB88V/jLGHJ9Y9J1ecXEw6FPuLJm8T7QHsEMM7PmocCF0c49O5CyDoMHRtC67TfTN8BR66qSBiMJUdOGanxV0raSvMetGvhbjYWW7vSUD7g4X4xwTOfyMkncuoQoN2ayIKPN5dS2ZCIWEUmxkrVYlVeyovPlFeqZDCvwBBSPitqWImnIpILzfckG6PceRSN1puw2WUoVDfnZqwNTYKS3JUPXOQe3+qXNuf5Yo+5rhFrdvM2Z2/T716QtuwG9f8OJwDw5WUrq3S71g04w8MhzFLNKOJL0QAf0UW1Xv9dPSbt1+kLzgDTt/AoJsjfJP3aVx8YOq7nqUHok+kzXMDxHUAECgYEA/T6GMZAWBOhFPQ7788ecIaX9FhKuix+brvc9exj2gC3OjU9Ya5heCzbmI5bgvVxy85/RDkma7r0z3WXiYmCYykVlHBx6sQpwFWs2REXmDeHXyhApZLUH52vr0XKz7TD1XcNkfRkb/1CDsA9q8tnw7gTkrMZ+od7604ykh5JZaEUCgYEAyK0RVJr0qyVBw8z4/x4Z9XtuhTTCT1iTIaBpOqVfdpr3ClN8ECLJ9tQZKwmIQ12DqBtnlYJOmp4S97GC17afsSXVmhOWTOQIJdBAB7wcar4ZGKKVWQsJJNxFpwvLZqX9L6174+V8k7OoBl1IewLK1ohRBMRFmd8xnZcqsc1X5oECgYEAuL2g5Y0oEwJiaC2DLY6jXoSZgT21qPYw+02PwzotsMo50Spd5Xfsux+ceb/6SQmlLgabWmHlrV3G9S77HCs9quk+3mgENRzZMTbaCqo3Lk9fvR9XIwlRL8ix6kRT76d0h6cfqobjvrg8qPZGXc0RjoFxVH0lKe7haexCpkfkA0UCgYBEAruj49xWAIt4U4hz1fzQQKPlS0srXwaGV/ox4Qgohz6AZmjegxvVpm5dMp7WzeOn3pnNhtsi9b3R6nxApWkbvYnV7Rt8NbA5OInq1SsAVirlOXzKL75KmsiUY5/syway2OXrB8SfvjyM46KD5h9ec9aZefdovcbv9OKIXeKTgQKBgQCK7XrU6SYd1aCvs/9M7OCr+roJTIR851PDAkr17RqDQ92TjeeeZX/4EB77G/yxFXmxYkWMPhdb3gIbvI9I6llDzIGluA6MG5jGglPYa0Lm1Sss0T4Nq6yooLechr7rBFaCcJUEjRMv4V5/Lca0EjFNKh0ee+ZLFHtfNUTWE7LBWw==",
    // 应用私钥字符串
  });

  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("appId", "2021000117621383");
  formData.addField("charset", "utf-8");
  formData.addField("signType", "RSA2");
  formData.addField("returnUrl", "http://localhost:8081/PaySuccess");

  //VCDB09227189ZXCN20
  console.log(req.body);
  formData.addField("bizContent", {
    outTradeNo: req.body.id,
    productCode: "FAST_INSTANT_TRADE_PAY",
    totalAmount: req.body.money,
    subject: "商品",
    body: "商品详情",
  });

  var result = await alipaySdk.exec(
    "alipay.trade.page.pay",
    {},
    { formData: formData }
  );
  console.log(result);
  if (result) {
    customObj = req.body;
    console.log("customobj", customObj);
  }
  customObj.socialCreditCode = req.body.id;

  customObj.cycleDate = req.body.cycleDate.join(",");
  customObj.cycleTimes = req.body.cycleTimes.join(",");
  customObj.payType = req.body.payType;
  customObj.money = req.body.money;
  customObj.sustainMonth = req.body.sustainMonth;
  customObj.isCus = "已定制";

  console.log("支付", customObj);
  return res.json({ status: 200, info: "查询成功", result });
});

//支付结果
router.post("/payAliQuery", async (req, res) => {
  const alipaySdk = new AlipaySdk({
    appId: "2021000117621383", // 开放平台上创建应用时生成的 appId
    signType: "RSA2", // 签名算法,默认 RSA2
    gateway: "https://openapi.alipaydev.com/gateway.do", // 支付宝网关地址 ，沙箱环境下使用时需要修改
    timeout: 5000,
    alipayPublicKey:
      "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAh2x1ppHmer4WTi/Hr0HUIyfT6Z12nJ4vxC8cBIqqnTMeqIQKx73qjKjA++10EVNN6lNdBzYVtDiJyWmjL/JxIGb0e30+C0nMUTT7gYNEiY9lSuCbEBzvmf3P1iQsXVDVMvs3msbqUkNCk/Ni0UsKEkH/Fj8tQd+f6xqqimN/t5ULTn58Q/zBJ5uS9bqaKWlRIg52ROrvbOElvXIoCu1J8sfyVRGuHh7d2f9VHB7ZmOCs/i7D6j3Un09hp5nJ5DyPsC6yU+W7NtlCIoqE8e1nALGtctLiDJXaffj6JP66h4YkBI+F08OxIE8hv89YUdZAS3+8RdgVSfCE4cWCszC7GQIDAQAB",
    // 支付宝公钥，需要对结果验签时候必填
    privateKey:
      "MIIEpAIBAAKCAQEAxoQNPEDGiyrbQSyXnXTQSZEHzFqnXfkv5HetYisJ6MC0CRykyh6QtarYR4pgMUO2msDxajIQzu5x64zCsyXo312gIme8nEOr0gjZ9I5OjgD8vkIrGmRZq8SHEom4ecgtCBs/0QkoITivj0Oibk6D4TdHEElUZg53ruAGeAvm1ImLIbAbzktAjMANUoER7CLJICk2AH+NL3wxPNlzzzY8kXkNYbaNjOQUnTwi6RXbWUuaObLR2AWni3jcOly5a90FADip+vGddJgQbQURQXXKAwRx0j6EdU0PgDqJWiGcy56vbNlOu9H+qPSbQLJq4QjJBCJ5JzeucqQclHRjwy6IxQIDAQABAoIBAB88V/jLGHJ9Y9J1ecXEw6FPuLJm8T7QHsEMM7PmocCF0c49O5CyDoMHRtC67TfTN8BR66qSBiMJUdOGanxV0raSvMetGvhbjYWW7vSUD7g4X4xwTOfyMkncuoQoN2ayIKPN5dS2ZCIWEUmxkrVYlVeyovPlFeqZDCvwBBSPitqWImnIpILzfckG6PceRSN1puw2WUoVDfnZqwNTYKS3JUPXOQe3+qXNuf5Yo+5rhFrdvM2Z2/T716QtuwG9f8OJwDw5WUrq3S71g04w8MhzFLNKOJL0QAf0UW1Xv9dPSbt1+kLzgDTt/AoJsjfJP3aVx8YOq7nqUHok+kzXMDxHUAECgYEA/T6GMZAWBOhFPQ7788ecIaX9FhKuix+brvc9exj2gC3OjU9Ya5heCzbmI5bgvVxy85/RDkma7r0z3WXiYmCYykVlHBx6sQpwFWs2REXmDeHXyhApZLUH52vr0XKz7TD1XcNkfRkb/1CDsA9q8tnw7gTkrMZ+od7604ykh5JZaEUCgYEAyK0RVJr0qyVBw8z4/x4Z9XtuhTTCT1iTIaBpOqVfdpr3ClN8ECLJ9tQZKwmIQ12DqBtnlYJOmp4S97GC17afsSXVmhOWTOQIJdBAB7wcar4ZGKKVWQsJJNxFpwvLZqX9L6174+V8k7OoBl1IewLK1ohRBMRFmd8xnZcqsc1X5oECgYEAuL2g5Y0oEwJiaC2DLY6jXoSZgT21qPYw+02PwzotsMo50Spd5Xfsux+ceb/6SQmlLgabWmHlrV3G9S77HCs9quk+3mgENRzZMTbaCqo3Lk9fvR9XIwlRL8ix6kRT76d0h6cfqobjvrg8qPZGXc0RjoFxVH0lKe7haexCpkfkA0UCgYBEAruj49xWAIt4U4hz1fzQQKPlS0srXwaGV/ox4Qgohz6AZmjegxvVpm5dMp7WzeOn3pnNhtsi9b3R6nxApWkbvYnV7Rt8NbA5OInq1SsAVirlOXzKL75KmsiUY5/syway2OXrB8SfvjyM46KD5h9ec9aZefdovcbv9OKIXeKTgQKBgQCK7XrU6SYd1aCvs/9M7OCr+roJTIR851PDAkr17RqDQ92TjeeeZX/4EB77G/yxFXmxYkWMPhdb3gIbvI9I6llDzIGluA6MG5jGglPYa0Lm1Sss0T4Nq6yooLechr7rBFaCcJUEjRMv4V5/Lca0EjFNKh0ee+ZLFHtfNUTWE7LBWw==",
    // 应用私钥字符串
  });

  const formData = new AlipayFormData();
  formData.setMethod("get");
  formData.addField("appId", "2021000117621383");
  formData.addField("charset", "utf-8");
  formData.addField("signType", "RSA2");
  console.log("req.body.id", req.body.id);

  formData.addField("bizContent", {
    outTradeNo: req.body.id,
  });

  var result = await alipaySdk.exec(
    "alipay.trade.query",
    {},
    { formData: formData }
  );

  request(result, (err, response, body) => {
    let obj = JSON.parse(body);
    console.log("obj", JSON.parse(body));
    //拼接写入
    customObj.trade_no = obj.alipay_trade_query_response.trade_no;
    customObj.send_pay_date = obj.alipay_trade_query_response.send_pay_date;
    console.log("订单查询", customObj);
    // let
    return res.json({ status: 200, info: "查询成功", value: customObj });
  });
});

//支付写入
router.post("/customInsertState", (req, res) => {
  console.log("支付写入", req.body);
  AllDB.customs
    .update(
      { socialCreditCode: req.body.socialCreditCode },
      {
        $set: {
          cycleTimes: req.body.cycleTimes,
          cycleDate: req.body.cycleDate,
          sustainMonth: req.body.sustainMonth,
          payType: req.body.payType,
          money: req.body.money,
          send_pay_date: req.body.send_pay_date,
          trade_no: req.body.trade_no,
          isCus: req.body.isCus,
        },
      }
    )
    .then((pro) => {
      console.log("保存成功", pro);
      AllDB.users
        .update({ username: req.body.username }, { $inc: { isCused: 1 } })
        .then((res) => {
          console.log(res);
        });
      return res.json({
        status: 200,
        value: pro,
        msg: "查询成功",
      });
    })
    .catch((err) => {
      console.log("保存失败", err);
      return res.json({
        status: 200,
        value: err,
        msg: "查询失败",
      });
    });
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

//回复用户反馈
router.post("/replayFeedback", (req, res) => {
  console.log("replayFeedback", req.body);
  operateDB.replayFeedback(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "发送成功",
    });
  });
});

//单条逻辑删除已经反馈信息
router.post("/delFeedbackById", (req, res) => {
  console.log("delFeedbackById", req.body);
  operateDB.delFeedbackById(req.body, (err, data) => {
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

//批量逻辑删除已经反馈信息
router.post("/delFeedbackBatch", (req, res) => {
  console.log("delFeedbackBatch", req.body);
  operateDB.delFeedbackBatch(req.body, (err, data) => {
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

//获取驾驶员位置
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

//给驾驶员发送通知
router.post("/getLatandlogByDriver", (req, res) => {
  console.log(req.body);
  operateDB.getLatandlogByDriver(req.body, (err, data) => {
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

//根据工号获取一天内驾驶员收到通知
router.post("/getDriverNoticeByReceiveToday", (req, res) => {
  console.log(req.body);
  operateDB.getDriverNoticeByReceiveToday(req.body, (err, data) => {
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

//根据工号获取一天内驾驶员发送通知
router.post("/getDriverNoticeBySendToday", (req, res) => {
  console.log(req.body);
  operateDB.getDriverNoticeBySendToday(req.body, (err, data) => {
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

//插入未录入垃圾量店铺
router.post("/insertGarbageCustom", (req, res) => {
  console.log("insertGarbageCustom", req.body);
  operateDB.insertGarbageCustom(req.body, (err, data) => {
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

// 批量插入店铺垃圾量
router.post("/insertGarbageBatch", (req, res) => {
  console.log("insertGarbageBatch", req.body);
  operateDB.insertGarbageBatch(req.body, (err, data) => {
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

//获取垃圾回收量 月份年份店铺
router.get("/getAllStoreGarbage", (req, res) => {
  console.log("getAllStoreGarbage");
  operateDB.getAllStoreGarbage((err, data) => {
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

//驾驶员模块
//垃圾查詢
router.post("/getGarbage", (req, res) => {
  console.log("getGarbage", req.body);
  operateDB.getGarbage(req.body, (err, data) => {
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
//发送通知给管理员
router.post("/sendDriverNoticeToAdmin", (req, res) => {
  console.log("sendDriverNoticeToAdmin", req.body);
  operateDB.sendDriverNoticeToAdmin(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "发送成功",
    });
  });
});

//提交GPS
router.post("/batchAddLatandlog", (req, res) => {
  console.log("batchAddLatandlog", req.body);
  operateDB.batchAddLatandlog(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "发送错误",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "发送成功",
    });
  });
});

//初次加载全部店铺垃圾产量1
router.post("/firstQueryAllCustom", (req, res) => {
  console.log("firstQueryAllCustom", req.body);
  operateDB.firstQueryAllCustom(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "查询失败",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "查询成功",
    });
  });
});

//查询垃圾存量
router.post("/queryCustomByWX", (req, res) => {
  console.log("queryCustomByWX", req.body);
  operateDB.queryCustomByWX(req.body, (err, data) => {
    if (err) {
      return res.json({
        status: "查询失败",
        msg: err,
      });
    }
    return res.json({
      status: "200",
      value: data,
      msg: "查询成功",
    });
  });
});

//提交店铺垃圾参考值
router.post("/commitRefer", (req, res) => {
  console.log("commitRefer", req.body);
  operateDB.commitRefer(req.body, (err, data) => {
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
    let rename = Date.now().toString() + "_" + file.originalname;
    let path = "D:/GraduationDesign/desfront/src/assets/img/" + rename;
    console.log(path);
    fs.renameSync(
      "D:/GraduationDesign/desfront/src/assets/img/" + file.filename,
      path
    );
    //获取文件基本信息
    fileInfo.type = file.mimetype;
    fileInfo.name = rename;
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
