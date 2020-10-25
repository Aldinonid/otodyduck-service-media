const Image = require("../../models/Image");

module.exports = async (req, res) => {
  const imageType = req.body.imageType;

  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "Please insert a image" });
  }

  const imageCreate = await Image.create({
    imageType,
    image: `images/${imageType}/${req.file.filename}`,
  });

  return res.json({
    status: "success",
    data: {
      ...imageCreate._doc,
      image: `${req.get("host")}/${imageCreate.image}`,
    },
  });
};
