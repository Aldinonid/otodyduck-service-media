const Image = require("../../models/Image");
const fs = require("fs");
const path = require("path");

module.exports = async (req, res) => {
  const imageId = req.params.id;
  const imageType = req.body.imageType;
  const imageData = await Image.findById(imageId).exec();

  if (!imageData) {
    return res
      .status(404)
      .json({ status: "error", message: "Image not found" });
  }

  if (req.file) {
    fs.unlink(path.join(imageData.image), (err) =>
      err ? console.log(`Error: ${err}`) : null
    );
    imageData.image = `images/${imageType}/${req.file.filename}`;
    await imageData.save();
  }

  imageData.imageType = imageType;

  await imageData.save();

  imageData.image = `${req.get("host")}/${imageData.image}`;

  return res.json({ status: "success", data: imageData });
};
