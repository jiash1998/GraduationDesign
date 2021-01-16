var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Router = require("./router/index");
var app = express();
var port = 3000;

//配置bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors());
//路由
app.use("/", Router);

app.listen(port, () => {
  console.log("Starting...mineback");
});