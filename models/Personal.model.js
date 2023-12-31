const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonalSchema = new Schema({
  title: String,
  inDate: Date,
  outDate: Date,
  income: Number,
  outCome: Number,
});

const personal = mongoose.model("personal", PersonalSchema);
module.exports = personal;
