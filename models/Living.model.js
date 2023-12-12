const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LivingSchema = new Schema({
  title: String,
  inDate: Date,
  outDate: Date,
  income: Number,
  outCome: Number,
});

const Living = mongoose.model("Living", LivingSchema);
module.exports = Living;
