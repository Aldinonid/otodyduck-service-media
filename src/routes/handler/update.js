const Image = require("../../models/Image");

const fs = require("fs");
const path = require("path");
const Validator = require("fastest-validator");
const v = new Validator();

const { HOSTNAME } = process.env;

module.exports = async (req, res) => {
  const imageId = req.params.id;
  const imageType = req.body.imageType;
  const imageData = await Image.findById(imageId).exec();

  if (!imageData) {
    return res
      .status(404)
      .json({ status: "error", message: "Image not found" });
  }

  const schema = {
    imageType: { type: "enum", values: ["tool", "course", "mentor", "user"] },
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
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

  imageData.image = `${HOSTNAME}/${imageData.image}`;

  return res.json({ status: "success", data: imageData });
};
