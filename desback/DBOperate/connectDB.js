var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/MyBlog", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var Schema = mongoose.Schema;

var SchemaDemo = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 18,
  },
  birthday: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model("MyBlog", SchemaDemo);
