const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EmergencySchema = new Schema ({
    
  });
  
  const Emergency = mongoose.model("Emergency", EmergencySchema);







module.exports = Emergency;