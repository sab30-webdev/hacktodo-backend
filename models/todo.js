const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  todo: {
    type: String,
  },
});

module.exports = mongoose.model("todo", todoSchema);
