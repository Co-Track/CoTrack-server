const router = require("express").Router();
const mongoose = require("mongoose");
const Personal = require("../models/Personal.model");
router.post("/Personal", (req, res, next) => {
    Personal.create({
        caseName:req.body.caseName,
        inDate:req.body.inDate,
        outDate:req.body.outDate,
        income:req.body.income,
        outCome:req.body.outCome,
    })
      .then(() => {
        res.send("A Personal was created!");
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Personal", (req, res, next) => {
    Living.find({})
      .then((Personal) => {
        console.log("Retrieved Emergency: ", Personal);
        res.json(Personal);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Personal/:PersonalId", (req, res, next) => {
    Personal.find({ _id: req.params.PersonalId })
      .populate("Personal")
      .then((PersonalDetails) => {
        res.json(PersonalDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.put("/Personal/:PersonalId", (req, res, next) => {
    Personal.findByIdAndUpdate(req.params.PersonalId)
      .then((PersonalDetails) => {
        res.json(PersonalDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.delete("/Personal/:PersonalId", (req, res, next) => {
    Personal.findByIdAndDelete(req.params.PersonalId)
      .then((PersonalDetails) => {
        res.json(PersonalDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router;
