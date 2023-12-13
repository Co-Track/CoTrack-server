const router = require("express").Router();
const mongoose = require("mongoose");
const Emergency = require("../models/Emergency.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);

router.post("/emergency", (req, res, next) => {
  Emergency.create({
    title: req.body.title,
    inDate: req.body.inDate,
    outDate: req.body.outDate,
    income: req.body.income,
    outcome: req.body.outcome,
  })
    .then(() => {
      res.send("An Emergency was created!");
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
  Emergency.findOne({ _id: req.params.emergencyId })
    .then((EmergencyDetails) => {
      console.log({ EmergencyDetails });
      res.json(EmergencyDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/emergency/:emergencyId", (req, res, next) => {
  console.log(req.body);
  const { title, inDate, outDate, income, outcome } = req.body;
  const newData = {
    title,
    inDate,
    outDate,
    income,
    outcome,
  };
  Emergency.findByIdAndUpdate(req.params.emergencyId, newData, { new: true })
    .then((EmergencyDetails) => {
      console.log(EmergencyDetails);
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
