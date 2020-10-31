const Image = require("../../models/Image");

const { HOSTNAME } = process.env;

module.exports = async (req, res) => {
  const images = await Image.find();

  const mappedImage = images.map((m) => {
    m.image = `${HOSTNAME}/${m.image}`;
    return m;
  });

  return res.json({
    status: "success",
    data: mappedImage,
  });
};
