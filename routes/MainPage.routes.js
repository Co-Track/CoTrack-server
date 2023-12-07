const router = require("express").Router();
const mongoose = require("mongoose");
const Emergency = require("../models/Emergency.model");
const Living = require("../models/Living.model");
const Personal =require("../models/Personal.model");

router.post("/MainPage", (req, res, next) => {
    MainPage.create({
        caseName:req.body.caseName,
        inDate:req.body.inDate,
        income:req.body.income,
        Living: req.body.Living,
        Emergency: req.body.Emergency,
        Personal: req.body.Personal,

    })
      .then(() => {
        res.send("A MainPage was created!");
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/MainPage", (req, res, next) => {
    MainPage.find({})
      .then((MainPage) => {
        console.log("Retrieved MainPage: ", MainPage);
        res.json(MainPage);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.get("/MainPage/:MainPageId", (req, res, next) => {
    MainPage.find({ _id: req.params.MainPageId })
      .populate("Living")
      .then((MainPageDetails) => {
        res.json(MainPageDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.put("/MainPage/:MainPageId", (req, res, next) => {
    MainPage.findByIdAndUpdate(req.params.MainPageId)
      .then((MainPageDetails) => {
        res.json(MainPageDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  router.delete("/MainPage/:MainPageId", (req, res, next) => {
    MainPage.findByIdAndDelete(req.params.MainPageId)
      .then((MainPageDetails) => {
        res.json(MainPageDetails);
      })
      .catch((error) => {
        next(error);
      });
  });
  
  module.exports = MainPage;
