var mineModel = require("../DBOperate/connectDB");

exports.insert = (callback) => {
  var arr = [];
  for (let i = 0; i < 5; i++) {
    let i = Math.ceil(Math.random() * 1000 + 3);
    let item = {
      name: "test" + i,
      age: i,
    };
    arr.push(item);
  }
  mineModel
    .insertMany(arr)
    .then((pro) => {
      console.log("保存成功", pro);
    })
    .catch((err) => {
      console.log("保存失败", err);
    });
  // let set = new Set(arr);
  // console.log(set);
  // console.log(set.size);
  callback(null);
};

exports.findAll = (callback) => {
  mineModel
    .find({}, "-_id")
    .then((pro) => {
      console.log("success");
      callback(null, pro);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};

exports.find = (data, callback) => {
  var condition = parseInt(data.values);
  // console.log(condition);
  mineModel
    .findOne({ age: condition }, "-_id")
    .then((pro) => {
      console.log("success");
      callback(null, pro);
    })
    .catch((err) => {
      console.log(err);
      callback(err);
    });
};
