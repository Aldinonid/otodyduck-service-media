const router = require("express").Router();

const toolHandler = require("./handler/tools");

router.get("/", toolHandler.getAllTools);
router.get("/:id", toolHandler.getTool);
router.post("/", toolHandler.create);
router.put("/:id", toolHandler.update);
router.delete("/:id", toolHandler.destroy);

module.exports = router;
