const router = require("express").Router();
const mongoose = require("mongoose");
const Living = require("../models/Living.model");
router.post("/Living", (req, res, next) => {
    Living.create({
        caseName:req.body.caseName,
        inDate:req.body.inDate,
        outDate:req.body.outDate,
        income:req.body.income,
        outCome:req.body.outCome,
    })
      .then(() => {
        res.send("A Living was created!");
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Living", (req, res, next) => {
    Living.find({})
      .then((Living) => {
        console.log("Retrieved Emergency: ", Living);
        res.json(Living);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/Living/:LivingId", (req, res, next) => {
    Living.find({ _id: req.params.LivingId })
      .populate("Living")
      .then((LivingDetails) => {
        res.json(LivingDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.put("/Living/:LivingId", (req, res, next) => {
    Living.findByIdAndUpdate(req.params.LivingId)
      .then((LivingDetails) => {
        res.json(LivingDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.delete("/Living/:LivingId", (req, res, next) => {
    Living.findByIdAndDelete(req.params.LivingId)
      .then((LivingDetails) => {
        res.json(LivingDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = router;
