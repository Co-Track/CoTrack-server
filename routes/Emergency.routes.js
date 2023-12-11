const router = require("express").Router();
const mongoose = require("mongoose");
const Emergency = require("../models/Emergency.model");

router.post("/emergency", (req, res, next) => {
  Emergency.create({
    caseName: req.body.caseName,
    inDate: req.body.inDate,
    outDate: req.body.outDate,
    income: req.body.income,
    outCome: req.body.outCome,
  })
    .then(() => {
      res.send("A Emergency was created!");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/emergency", (req, res, next) => {
  Emergency.find({})
    .then((Emergency) => {
      console.log("Retrieved Emergency: ", Emergency);
      res.json(Emergency);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/emergency/:emergencyId", (req, res, next) => {
    Emergency.find({ _id: req.params.emergencyId })
    .populate("Living")
    .then((EmergencyDetails) => {
      res.json(EmergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/emergency/:emergencyId", (req, res, next) => {
  Emergency.findByIdAndUpdate(req.params.emergencyId)
    .then((EmergencyDetails) => {
      res.json(EmergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/emergency/:emergencyId", (req, res, next) => {
    Emergency.findByIdAndDelete(req.params.emergencyId)
    .then((EmergencyDetails) => {
      res.json(EmergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
