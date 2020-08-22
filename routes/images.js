const router = require("express").Router();

/* GET images listing. */
router.get("/", function (req, res) {
  res.send("This is images route");
});

module.exports = router;
