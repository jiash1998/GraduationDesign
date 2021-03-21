var AllDB = require("../DBOperate/connectDB");

//公共模块
//登录接口1
exports.signin = (data, callback) => {
  let name = data.username;
  let pass = data.password;
  console.log(name, pass);
  AllDB.users
    .find({ username: name, password: pass })
    .then((res) => {
      console.log(res);
      callback(null, res);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

//注册接口1
exports.register = (data, callback) => {
  console.log("operate:", data);
  AllDB.users
    .insertMany(data)
    .then((pro) => {
      console.log("保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//获取所有公告1
exports.getAllNotice = (callback) => {
  console.log("getallnotices");
  AllDB.notices
    .find()
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//根据用户名获取个人资料1
exports.getUserByUsername = (data, callback) => {
  console.log("getUserByUsername");
  AllDB.users
    .findOne({ username: data.username })
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//修改个人资料1ing
exports.updateUserByName = (data, callback) => {
  console.log("updateUserByName", data);
  AllDB.users
    .save({ _id: data._id }, { $set: { email: true } })
    .then((pro) => {
      console.log("修改成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("修改失败", err);
      callback(err);
    });
};

//商户
//注册店铺1
exports.addCustom = (data, callback) => {
  console.log("addCustom:", data);
  AllDB.customs
    .insertMany(data)
    .then((pro) => {
      console.log("店铺保存成功", pro);
      AllDB.users
        .update({ username: data.user }, { $inc: { cus: 1 } })
        .then((res) => {
          console.log(res);
        });
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//获取名下店铺1
exports.getAllCustomSelf = (data, callback) => {
  console.log("getAllCustomSelf:", data);
  AllDB.customs
    .find({ user: data.username })
    .then((res) => {
      console.log(res.length);
      callback(null, res);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

//根据用户名id获取个人通知1
exports.getByPNoticeUsername = (data, callback) => {
  console.log("getByPNoticeUsername:", data);
  AllDB.users
    .findOne({ username: data.username })
    .then((res) => {
      console.log("getByPNoticeUsername", res);
      AllDB.noticeselfs.find({ userId: res._id }).then((res) => {
        console.log(res);
        callback(null, res);
      });
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

//商户反馈接口1
exports.addFeedback = (data, callback) => {
  console.log("addFeedback:", data);
  AllDB.feedbacks
    .insertMany(data)
    .then((pro) => {
      console.log("反馈保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("反馈保存失败", err);
      callback(err);
    });
};

//删除店铺模块1
exports.delCustomBySocialCode = (data, callback) => {
  console.log("delCustomBySocialCode:", data);
  AllDB.customs
    .remove({ socialCreditCode: data.code })
    .then((res) => {
      console.log(res);
      callback(null, res);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

//管理员模块
//发送公告1
exports.insertNotice = (data, callback) => {
  console.log("insertNotice:", data);
  AllDB.notices
    .insertMany(data)
    .then((pro) => {
      console.log("公告保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//获取所有用户1
exports.getAllUser = (callback) => {
  console.log("getAllUser");
  AllDB.users
    .find()
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//获取所有反馈1
exports.getAllFeedBack = (callback) => {
  console.log("getAllFeedBack");
  AllDB.feedbacks
    .find()
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//获取所有已经反馈1
exports.getAllReply = (callback) => {
  console.log("getAllReply");
  AllDB.feedbacks
    .aggregate([
      {
        $lookup: {
          from: "replys",
          localField: "_id".toString(),
          foreignField: "username",
          as: "feedback_reply",
        },
      },
      //数据打散
      { $unwind: "$feedback_reply" },
      //两个表数据筛选
      {
        $project: {
          feedbackDate: "$feedbackDate",
          content1: "$content",
          username: "$username",
          replyDate: "$feedback_reply.replyDate",
        },
      },
    ])
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//回复用户反馈
exports.replayFeedback = (data, callback) => {
  console.log("replayFeedback:", data);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var time = year + "-" + month + "-" + day;
  data.replyDate = time;
  console.log(data);
  AllDB.replys
    .insertMany(data)
    .then((pro) => {
      console.log("保存成功", pro);
      AllDB.feedbacks
        .update({ _id: data.fbId }, { $set: { state: "已回复" } })
        .then((res) => {
          console.log(res);
        });
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//单条逻辑删除已经回复的反馈
exports.delFeedbackById = (data, callback) => {
  console.log("delFeedbackById:", data);
  AllDB.feedbacks
    .update({ _id: data.id }, { $set: { deleted: "0" } })
    .then((pro) => {
      console.log("保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//获取所有店铺信息1
exports.getAllCustom = (callback) => {
  console.log("getAllCustom");
  AllDB.customs
    .find()
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      callback(err);
    });
};

//根据店铺名搜索店铺1
exports.getCustomByName = (data, callback) => {
  console.log("getCustomByName", data);
  AllDB.customs
    .find({ name: { $regex: data.name } })
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//注册驾驶员1
exports.addDriver = (data, callback) => {
  console.log("addDriver:", data);
  AllDB.users
    .insertMany(data)
    .then((pro) => {
      console.log("users保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });

  AllDB.drivers
    .insertMany(data)
    .then((pro) => {
      console.log("driver保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//获取驾驶员位置1
exports.getLatandlogByDriver = (data, callback) => {
  console.log("getLatandlogByDriver:", data);
  AllDB.latandlons
    .find({ driver: data.driver })
    .then((pro) => {
      console.log("位置获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("位置获取失败", err);
      callback(err);
    });
};

//给驾驶员发送通知1
exports.sendDriverNoticeToDriver = (data, callback) => {
  console.log("sendDriverNoticeToDriver:", data);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var time = year + "-" + month + "-" + day;
  data.time = time;
  console.log(data);
  AllDB.noticedrivers
    .insertMany(data)
    .then((pro) => {
      console.log("保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//根据工号获取一天内驾驶员收到通知1
exports.getDriverNoticeByReceiveToday = (data, callback) => {
  console.log("getDriverNoticeByReceiveToday", data);
  AllDB.noticedrivers
    .find({ receiver: data.receiver })
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//根据工号获取一天内驾驶员发送通知1
exports.getDriverNoticeBySendToday = (data, callback) => {
  console.log("getDriverNoticeBySendToday", data);
  AllDB.noticedrivers
    .find({ sender: data.sender })
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//插入未录入垃圾量店铺1
exports.insertGarbageCustom = (data, callback) => {
  console.log("insertGarbageCustom", data.productions);
  AllDB.garbagemonths
    .insertMany(data.productions)
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

// 批量插入店铺垃圾量1
exports.insertGarbageBatch = (data, callback) => {
  console.log("insertGarbageBatch", data.productions);

  data.productions.forEach((item) => {
    AllDB.garbagemonths
      .updateMany(
        {
          customId: item.customId,
          yearNum: item.yearNum,
          monthNum: item.monthNum,
        },
        { $set: { production: item.production } }
      )
      .then((pro) => {
        console.log("获取成功", pro);
        callback(null, pro);
      })
      .catch((err) => {
        console.log("获取失败", err);
        callback(err);
      });
  });
};

//获取垃圾回收量 月份年份店铺1
exports.getAllStoreGarbage = (callback) => {
  console.log("getAllStoreGarbage");
  AllDB.garbagemonths
    .aggregate([
      {
        $lookup: {
          from: "customs",
          localField: "customId",
          foreignField: "socialCreditCode",
          as: "custom_garbage",
        },
      },
      //数据打散
      { $unwind: "$custom_garbage" },
      //两个表数据筛选
      {
        $project: {
          customId: "$customId",
          monthNum: "$monthNum",
          yearNum: "$yearNum",
          production: "$production",
          reference: "$reference",
          type: "$custom_garbage.type",
          name: "$custom_garbage.name",
          phone: "$custom_garbage.phone",
          header: "$custom_garbage.header",
          basisGarMonth: "$custom_garbage.basisGarMonth",
        },
      },
    ])
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//给用户发送通知1
exports.addPersonalNotice = (data, callback) => {
  console.log("addPersonalNotice:", data);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var time = year + "-" + month + "-" + day;
  data.time = time;
  console.log(data);
  AllDB.noticeselfs
    .insertMany(data)
    .then((pro) => {
      console.log("保存成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//驾驶员模块
//获取垃圾1
exports.getGarbage = (data, callback) => {
  console.log("getGarbage1", data);
  var reg = /[\u4E00-\u9FA5]/g;
  console.log(reg.test(data.garbageName));
  if (reg.test(data.garbageName)) {
  }
  AllDB.garbagesecs
    .find({ garbage_name: { $regex: data.garbageName } })
    .then((pro) => {
      console.log("获取成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("获取失败", err);
      callback(err);
    });
};

//发送通知给管理员1
exports.sendDriverNoticeToAdmin = (data, callback) => {
  console.log("sendDriverNoticeToAdmin", data);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var time = year + "-" + month + "-" + day;
  data.time = time;
  AllDB.noticedrivers
    .insertMany(data)
    .then((pro) => {
      console.log("发送成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("发送失败", err);
      callback(err);
    });
};

//提交GPS1
exports.batchAddLatandlog = (data, callback) => {
  console.log("batchAddLatandlog", data);
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // var time = year + "-" + month + "-" + day + "-" + hour + ":" + minute;
  var time = year + "-" + month + "-" + day;
  data.time = time;
  AllDB.latandlons
    .insertMany(data)
    .then((pro) => {
      console.log("发送成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("发送失败", err);
      callback(err);
    });
};

//初次加载全部店铺垃圾产量1
exports.firstQueryAllCustom = (data, callback) => {
  console.log("firstQueryAllCustom", data);
  AllDB.garbagemonths
    .aggregate([
      {
        $lookup: {
          from: "customs",
          localField: "customId",
          foreignField: "socialCreditCode",
          as: "allcustom",
        },
      },
      //数据打散
      { $unwind: "$allcustom" },
      //数据筛选
      //筛选字段类型严格一致
      { $match: { yearNum: data.year, monthNum: data.month, reference: "0" } },
      //两个表数据筛选
      {
        $project: {
          customId: "$customId",
          monthNum: "$monthNum",
          yearNum: "$yearNum",
          production: "$production",
          reference: "$reference",
          type: "$allcustom.type",
          name: "$allcustom.name",
          phone: "$allcustom.phone",
          header: "$allcustom.header",
          isCus: "$allcustom.isCus",
        },
      },
    ])
    .then((pro) => {
      console.log("firstQueryAllCustom发送成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("发送失败", err);
      callback(err);
    });
};

//查询垃圾存量1
exports.queryCustomByWX = (data, callback) => {
  console.log("queryCustomByWX", data);
  let jsonObj = {};
  if (data.type == "全部") {
    jsonObj = {
      yearNum: data.year,
      monthNum: data.month,
      reference: data.tag == "未录" ? "0" : { $gt: "0" },
    };
  } else {
    jsonObj = {
      yearNum: data.year,
      monthNum: data.month,
      type: data.type,
      reference: data.tag == "未录" ? "0" : { $gt: "0" },
    };
  }
  console.log(jsonObj);
  AllDB.garbagemonths
    .aggregate([
      {
        $lookup: {
          from: "customs",
          localField: "type",
          foreignField: "type",
          as: "query",
        },
      },
      //数据打散
      { $unwind: "$query" },
      //数据筛选
      //筛选字段类型严格一致
      { $match: jsonObj },
      //两个表数据筛选
      {
        $project: {
          customId: "$customId",
          monthNum: "$monthNum",
          yearNum: "$yearNum",
          production: "$production",
          reference: "$reference",
          type: "$query.type",
          name: "$query.name",
          phone: "$query.phone",
          header: "$query.header",
        },
      },
    ])
    .then((pro) => {
      console.log("发送成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("发送失败", err);
      callback(err);
    });
};

//提交店铺垃圾参考值1
exports.commitRefer = (data, callback) => {
  console.log("commitRefer", data);
  AllDB.garbagemonths
    .update(
      { customId: data.customId },
      { $set: { reference: data.reference } }
    )
    .then((pro) => {
      console.log("发送成功", pro);
      callback(null, pro);
    })
    .catch((err) => {
      console.log("发送失败", err);
      callback(err);
    });
};
