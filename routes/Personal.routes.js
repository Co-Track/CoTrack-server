const router = require("express").Router();
const mongoose = require("mongoose");
const Personal = require("../models/Personal.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);
// POST /personal/

router.post("/personal", (req, res, next) => {
  Personal.create({
    title: req.body.title,
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
  Personal.find({})
    .then((Personal) => {
      console.log("Retrieved Personal: ", Personal);
      res.json(Personal);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/personal/:personalId", (req, res, next) => {
  Personal.findOne({ _id: req.params.personalId })
    .then((PersonalDetails) => {
      console.log({ PersonalDetails });
      res.json(PersonalDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/personal/:personalId", (req, res, next) => {
  console.log(req.body);
  const { title, inDate, outDate, inCome, outCome } = req.body;
  const newData = {
    title,
    inDate,
    outDate,
    inCome,
    outCome,
  };
  Personal.findByIdAndUpdate(req.params.personalId, newData, { new: true })
    .then((PersonalDetails) => {
      console.log(PersonalDetails);
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
