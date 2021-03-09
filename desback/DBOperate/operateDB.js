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
    .find({ name: data.name })
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
  if(reg.test(data.garbageName)){
    
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
  var hour = date.getHours();
  var minute = date.getMinutes();
  var time = year + "-" + month + "-" + day + "-" + hour + ":" + minute;
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

//创建组织
exports.createOrgan = (data, callback) => {
  AllDB.organs
    .insertMany(data)
    .then((pro) => {
      console.log("保存成功", pro);
      AllDB.users
        .update(
          { username: pro[0].organBoss },
          { $set: { organName: pro[0].organName, organCode: pro[0].organCode } }
        )
        .then((res) => {
          console.log(res);
          callback(null, pro);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log("保存失败", err);
      callback(err);
    });
};

//批准假条
exports.replayLeave = (data, callback) => {
  console.log(data);

  AllDB.leaves
    .update(
      { username: data.username, time: data.time },
      { $set: { status: "true" } }
    )
    .then((res) => {
      callback(null, res);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

//开除员工
exports.removeOragnUser = (data, callback) => {
  console.log(data);

  AllDB.users
    .update(
      { username: data.username },
      { $set: { organName: "none", organCode: "none" } }
    )
    .then((res) => {
      console.log(res);
      callback(null, res);
    })
    .catch((er) => {
      console.log(err);
      callback(err);
    });
};

//用户模块
//加入组织
exports.addOrgan = (data, callback) => {
  AllDB.users
    .update(
      { username: data.username },
      { $set: { organName: data.organName, organCode: data.organCode } }
    )
    .then((res) => {
      console.log(res);
      callback(null, res);
    })
    .catch((er) => {
      console.log(err);
      callback(err);
    });
};
