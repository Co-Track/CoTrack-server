const router = require("express").Router();
const mongoose = require("mongoose");
const Personal = require("../models/personal.model");
router.post("/personal", (req, res, next) => {
  Personal.create({
    caseName: req.body.caseName,
    inDate: req.body.inDate,
    outDate: req.body.outDate,
    income: req.body.income,
    outCome: req.body.outCome,
  })
    .then(() => {
      res.send("A Personal was created!");
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/personal", (req, res, next) => {
  Living.find({})
    .then((Personal) => {
      console.log("Retrieved Emergency: ", Personal);
      res.json(Personal);
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/personal/:personalId", (req, res, next) => {
  Personal.find({ _id: req.params.personalId })
    .populate("Personal")
    .then((PersonalDetails) => {
      res.json(PersonalDetails);
    })
    .catch((error) => {
      next(error);
    });
});
router.put("/personal/:personalId", (req, res, next) => {
  Personal.findByIdAndUpdate(req.params.personalId)
    .then((PersonalDetails) => {
      res.json(PersonalDetails);
    })
    .catch((error) => {
      next(error);
    });
});
router.delete("/personal/:personalId", (req, res, next) => {
  Personal.findByIdAndDelete(req.params.personalId)
    .then((PersonalDetails) => {
      res.json(PersonalDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
