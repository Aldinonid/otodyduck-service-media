const Image = require("../../models/Image");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const imageId = req.params.id;
  const imageData = await Image.findById(imageId).exec();

  if (!imageData) {
    return res
      .status(404)
      .json({ status: "error", message: "Image not found" });
  }

  fs.unlink(path.join(imageData.image), (err) =>
    err ? console.log(`Error: ${err}`) : null
  );

  await imageData.remove();

  return res.json({ status: "success", message: "Image has been deleted" });
};
