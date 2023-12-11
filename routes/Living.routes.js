const router = require("express").Router();
const mongoose = require("mongoose");
const Living = require("../models/Living.model");

router.post("/living", (req, res, next) => {
  Living.create({
    caseName: req.body.caseName,
    inDate: req.body.inDate,
    outDate: req.body.outDate,
    income: req.body.income,
    outCome: req.body.outCome,
  })

    .then((createdLiving) => {
      res.status(201).json(createdLiving);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/living", (req, res, next) => {
  Living.find({})
    .then((Living) => {
      console.log("Retrieved Emergency: ", Living);
      res.json(Living);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("living/:livingId", (req, res, next) => {
  Living.find({ _id: req.params.livingId })
    .populate("Living")
    .then((LivingDetails) => {
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("living/:livingId", (req, res, next) => {
  Living.findByIdAndUpdate(req.params.livingId)
    .then((LivingDetails) => {
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("living/:livingId", (req, res, next) => {
  Living.findByIdAndDelete(req.params.livingId)
    .then((LivingDetails) => {
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = router;
