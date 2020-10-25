const Image = require("../../models/Image");

module.exports = async (req, res) => {
  const images = await Image.find();

  const mappedImage = images.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;
    return m;
  });

  return res.json({
    status: "success",
    data: mappedImage,
  });
};
