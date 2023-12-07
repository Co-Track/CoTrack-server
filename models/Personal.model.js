const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PersonalSchema = new Schema({
  caseName: String,
  inDate: Date,
  outDate: Date,
  income: Number,
  outCome: Number,
});

const Personal = mongoose.model("Personal", PersonalSchema);
module.exports = Personal;
