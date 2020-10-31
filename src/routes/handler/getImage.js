const Image = require("../../models/Image");

const { HOSTNAME } = process.env;

module.exports = async (req, res) => {
  const imageId = req.params.id;
  const imageData = await Image.findById(imageId).exec();

  if (!imageData) {
    return res
      .status(404)
      .json({ status: "error", message: "Image not found" });
  }

  imageData.image = `${HOSTNAME}/${imageData.image}`;

  return res.json({
    status: "success",
    data: imageData,
  });
};
