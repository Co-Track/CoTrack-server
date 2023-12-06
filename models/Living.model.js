const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LivingSchema = new Schema ({
    caseName:String,
    inDate:Date,
    outDate:Date,
    income:Number,
    outCome:Number,
  });
  
  const Living = mongoose.model("Living", LivingSchema);
module.exports = Living;