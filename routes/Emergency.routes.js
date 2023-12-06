const router = require("express").Router();
const mongoose = require("mongoose");
const Emergency = require("../models/Emergency.model");
const Living = require("../models/Living.model");
router.post("/Emergency", (req, res, next) => {
    Emergency.create({
        caseName:req.body.caseName,
        inDate:req.body.inDate,
        outDate:req.body.outDate,
        income:req.body.income,
        outCome:req.body.outCome,
    })
      .then(() => {
        res.send("A Emergency was created!");
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Emergency", (req, res, next) => {
    Emergency.find({})
      .then((Emergency) => {
        console.log("Retrieved Emergency: ", Emergency);
        res.json(Emergency);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Emergency/:EmergencyId", (req, res, next) => {
    Cohort.find({ _id: req.params.EmergencyId })
      .populate("Living")
      .then((EmergencyDetails) => {
        res.json(EmergencyDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.put("/Emergency/:EmergencyId", (req, res, next) => {
    Emergency.findByIdAndUpdate(req.params.EmergencyId)
      .then((EmergencyDetails) => {
        res.json(EmergencyDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.delete("/Emergency/:EmergencyId", (req, res, next) => {
    Living.findByIdAndDelete(req.params.EmergencyId)
      .then((EmergencyDetails) => {
        res.json(EmergencyDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router;
