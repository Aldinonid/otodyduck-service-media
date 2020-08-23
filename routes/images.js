const router = require("express").Router();

const imageHanlder = require("./handler/images");

/* GET images listing. */
router.get("/", function (req, res) {
  res.send("This is images route");
});

module.exports = router;
