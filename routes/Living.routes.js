const router = require("express").Router();
const mongoose = require("mongoose");
const Living = require("../models/Living.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");

router.use(isAuthenticated);

router.post("/living", (req, res, next) => {
  Living.create({
    title: req.body.title,
    inDate: req.body.inDate,
    outDate: req.body.outDate,
    income: req.body.income,
    outcome: req.body.outcome,
  })

    .then(() => {
      res.send("A Living was created!");
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/living", (req, res, next) => {
  Living.find({})
    .then((Living) => {
      console.log("Retrieved Living: ", Living);
      res.json(Living);
    })
    .catch((error) => {
      next(error);
    });
});

router.get("/living/:livingId", (req, res, next) => {
  Living.findOne({ _id: req.params.livingId })
    .then((LivingDetails) => {
      console.log({ LivingDetails });
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.put("/living/:livingId", (req, res, next) => {
  console.log(req.body);

  const { title, inDate, outDate, income, outcome } = req.body;
  const newData = {
    title,
    inDate,
    outDate,
    income,
    outcome,
  };

  Living.findByIdAndUpdate(req.params.livingId, newData, { new: true })
    .then((LivingDetails) => {
      console.log(LivingDetails);
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});

router.delete("/living/:livingId", (req, res, next) => {
  Living.findByIdAndDelete(req.params.livingId)
    .then((LivingDetails) => {
      res.json(LivingDetails);
    })
    .catch((error) => {
      next(error);
    });
});
module.exports = router;
