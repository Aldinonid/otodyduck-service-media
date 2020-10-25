const router = require("express").Router();
const { upload } = require("../../middlewares/multer");
const imageHandler = require("./handler");

//* Route GET, POST, PUT, DELETE *//

router.get("/:id", imageHandler.getImage);
router.get("/", imageHandler.getAllImages);
router.post("/", upload, imageHandler.create);
router.put("/:id", upload, imageHandler.update);
router.delete("/:id", imageHandler.destroy);

module.exports = router;
