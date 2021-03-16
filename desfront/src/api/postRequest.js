import interceptor from "../util/interceptor.js";
import qs from "querystring";

const headersAll = "application/x-www-form-urlencoded";
const headersJson = "application/json";
const methodsAll = "post";

var postString = (urlSelf, methodSelf, dataSelf, headerSelf) => {
  return {
    url: urlSelf,
    method: methodSelf,
    data: qs.stringify(dataSelf),
    headers: {
      "Content-Type": headerSelf
    }
  };
};

var postStringJson = (urlSelf, methodSelf, dataSelf, headerSelf) => {
  return {
    url: urlSelf,
    method: methodSelf,
    data: dataSelf,
    headers: {
      "Content-Type": headerSelf
    }
  };
};

export default {
  /**公共模块 */
  //用户登录1
  comSign(data) {
    return interceptor(postString("/apis/sign", methodsAll, data, headersAll));
  },
  //用户注册1
  comRegister(data) {
    return interceptor(
      postString("/apis/register", methodsAll, data, headersAll)
    );
  },

  //提交session保存姓名，获取个人资料1
  getUserByUsername(name) {
    return interceptor(
      postString("/apis/getUserByUsername", methodsAll, name, headersAll)
    );
  },
  //修改个人资料1
  updateUserByName(name) {
    return interceptor(
      postString("/apis/updateUserByName", methodsAll, name, headersAll)
    );
  },

  /**管理员**/
  //发布公告1
  insertNotice(data) {
    return interceptor(
      postString("/apis/insertNotice", methodsAll, data, headersAll)
    );
  },
  //根据用户 id 发生通知1
  addPersonalNotice(data) {
    return interceptor(
      postString("/apis/addPersonalNotice", methodsAll, data, headersAll)
    );
  },
  //注册驾驶员1
  addDriver(data) {
    return interceptor(
      postString("/apis/addDriver", methodsAll, data, headersAll)
    );
  },
  //获取位置1
  getLatandlogByDriver(data) {
    return interceptor(
      postString("/apis/getLatandlogByDriver", methodsAll, data, headersAll)
    );
  },
  //根据工号发送通知1
  sendDriverNoticeToDriver(data) {
    return interceptor(
      postString("/apis/sendDriverNoticeToDriver", methodsAll, data, headersAll)
    );
  },
  //根据工号获取一天内驾驶员收到通知1
  getDriverNoticeByReceiveToday(data) {
    return interceptor(
      postString(
        "/apis/getDriverNoticeByReceiveToday",
        methodsAll,
        data,
        headersAll
      )
    );
  },
  //根据工号获取一天内驾驶员发送通知1
  getDriverNoticeBySendToday(data) {
    return interceptor(
      postString(
        "/apis/getDriverNoticeBySendToday",
        methodsAll,
        data,
        headersAll
      )
    );
  },
  //根据店铺名搜索店铺1
  getCustomByName(data) {
    return interceptor(
      postString("/apis/getCustomByName", methodsAll, data, headersAll)
    );
  },
  //垃圾量录入
  insertGarbageBatch(data) {
    return interceptor(
      postStringJson("/production/add/batch", methodsAll, data, headersJson)
    );
  },
  insertGarbage(data) {
    return interceptor(
      postStringJson("/production/add", methodsAll, data, headersJson)
    );
  },

  //回复用户反馈
  replayFeedback(data) {
    return interceptor(
      postString("/replayFeedback", methodsAll, data, headersAll)
    );
  },
  //逻辑删除已回复反馈
  delFeedbackById(id) {
    return interceptor(
      postString("/delFeedbackById", methodsAll, id, headersAll)
    );
  },

  //商家
  //录入店铺1
  merAddCustom(data) {
    return interceptor(
      postString("/apis/addCustom", methodsAll, data, headersAll)
    );
  },
  //商户反馈1
  addFeedback(data) {
    return interceptor(
      postString("/apis/addFeedback", methodsAll, data, headersAll)
    );
  },
  //获取名下店铺1
  getAllCustomSelf(data) {
    return interceptor(
      postString("/apis/getAllCustomSelf", methodsAll, data, headersAll)
    );
  },
  //根据用户名获取通知1
  getByPNoticeUsername(data) {
    return interceptor(
      postString("/apis/getByPNoticeUsername", methodsAll, data, headersAll)
    );
  },
  //根据通知 id 设为已读
  changToRead(data) {
    return interceptor(
      postString("/changToRead", methodsAll, data, headersAll)
    );
  },

  //删除店铺1
  delCustomBySocialCode(data) {
    return interceptor(
      postStringJson(
        "/apis/delCustomBySocialCode",
        methodsAll,
        data,
        headersJson
      )
    );
  },
  //支付宝付款店铺
  payAli(data) {
    return interceptor(
      postString("/apis/payAli", methodsAll, data, headersAll)
    );
  },
  //支付宝订单查询
  payAliQuery(data) {
    return interceptor(
      postString("/apis/payAliQuery", methodsAll, data, headersAll)
    );
  },
  //支付宝修改店铺定制状态
  customInsertState(data) {
    return interceptor(
      postString("/apis/customInsertState", methodsAll, data, headersAll)
    );
  },
  //支付宝付款超出
  payForExcess(data) {
    return interceptor(
      postString("/payForExcess", methodsAll, data, headersAll)
    );
  },
  //修改定制
  updateCustomById(id) {
    return interceptor(
      postString("/updateCustomById", methodsAll, id, headersAll)
    );
  },
};
