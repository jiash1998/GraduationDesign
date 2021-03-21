import interceptor from "../util/interceptor.js";

const methodAll = "get";
var getString = (urlSelf, methodSelf) => {
  return {
    url: urlSelf,
    method: methodSelf,
  };
};

//get携带参数
var getString_P = (urlSelf, data, methodSelf) => {
  return {
    url: urlSelf,
    params: { customId: data },
    method: methodSelf,
  };
};

//excel 请求头
var getStringExcel = (urlSelf, methodSelf) => {
  return {
    url: urlSelf,
    headers: {
      "Content-Type": "application/json; application/octet-stream",
    },
    responseType: "arraybuffer",
    method: methodSelf,
  };
};
export default {
  /** 公共 */
  //获取所有通告
  getNotice() {
    return interceptor(getString("/apis/getAllNotice", methodAll));
  },
  //管理员接口
  //获取所有用户
  getAllUser() {
    return interceptor(getString("/apis/getAllUser", methodAll));
  },
  //获取跟踪操作
  getAllOperate() {
    return interceptor(getString("/getAllOperate", methodAll));
  },
  //获取店铺所有信息
  getAllCustom() {
    return interceptor(getString("/apis/getAllCustom", methodAll));
  },
  //获取于驾驶员通信
  // getAllDriverNotice(){
  //   return interceptor(getString("/getAllDriverNotice", methodAll));
  // },
  //获取用户反馈
  getAllFeedBack() {
    return interceptor(getString("/apis/getAllFeedBack", methodAll));
  },
  //获取处理过反馈
  getAllReply() {
    return interceptor(getString("/apis/getAllReply", methodAll));
  },

  //商铺接口
  //支付宝付款店铺
  payAli() {
    return interceptor(getString("/apis/payAliTest", methodAll));
  },
  //获取店铺垃圾
  getAllStoreGarbage() {
    return interceptor(getString("/apis/getAllStoreGarbage", methodAll));
  },
  //根据id，获取店铺垃
  getByCustomId(id) {
    return interceptor(getString_P("/production/getByCustomId", id, methodAll));
  },
};
