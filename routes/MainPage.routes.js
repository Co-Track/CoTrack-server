const router = require("express").Router();

router.post("/mainPage", (req, res, next) => {
  MainPage.create({
    caseName: req.body.caseName,
    inDate: req.body.inDate,
    income: req.body.income,
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
router.get("/mainPage", (req, res, next) => {
  MainPage.find({})
    .then((MainPage) => {
      console.log("Retrieved MainPage: ", MainPage);
      res.json(MainPage);
    })
    .catch((error) => {
      next(error);
    });
});
router.get("/mainPage/:mainPageId", (req, res, next) => {
  MainPage.find({ _id: req.params.mainPageId })
    .populate("Living")
    .then((MainPageDetails) => {
      res.json(MainPageDetails);
    })
    .catch((error) => {
      next(error);
    });
});
router.put("/mainPage/:mainPageId", (req, res, next) => {
  MainPage.findByIdAndUpdate(req.params.mainPageId)
    .then((MainPageDetails) => {
      res.json(MainPageDetails);
    })
    .catch((error) => {
      next(error);
    });
});
router.delete("/mainPage/:mainPageId", (req, res, next) => {
  MainPage.findByIdAndDelete(req.params.mainPageId)
    .then((MainPageDetails) => {
      res.json(MainPageDetails);
    })
    .catch((error) => {
      next(error);
    });
});

module.exports = MainPage;
