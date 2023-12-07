const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MainPageSchema = new Schema({
    caseName: String,
    inDate: Date,
    income: Number,
    Living: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Living"
    },
    Personal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Personal"
    },
    Emergency: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Emergency"
    }
});

const MainPage = mongoose.model("MainPage", MainPageSchema);
module.exports = MainPage;