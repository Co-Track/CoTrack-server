const router = require("express").Router();
const mongoose = require("mongoose");
const Emergency = require("../models/emergency.model");
const Living = require("../models/living.model");

router.post("/", (req, res, next) => {
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
    emergency.find({ _id: req.params.emergencyId })
    .populate("Living")
    .then((emergencyDetails) => {
      res.json(emergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/emergency/:emergencyId", (req, res, next) => {
  emergency.findByIdAndUpdate(req.params.emergencyId)
    .then((emergencyDetails) => {
      res.json(emergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/emergency/:emergencyId", (req, res, next) => {
    emergency.findByIdAndDelete(req.params.emergencyId)
    .then((emergencyDetails) => {
      res.json(emergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
