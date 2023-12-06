const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const emergencySchema = new Schema ({
    caseName:String,
    inDate:Date,
    outDate:Date,
    income:Number,
    outCome:Number,
  });
  
  const Emergency = mongoose.model("Emergency", emergencySchema);
module.exports = Emergency;