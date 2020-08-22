const router = require("express").Router();

/* GET tools listing. */
router.get("/", function (req, res) {
  res.send("This is tools route");
});

module.exports = router;
