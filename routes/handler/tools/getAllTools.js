const { Tool } = require("../../../models");

module.exports = async (req, res) => {
  //? Get all tools data ?//
  const tools = await Tool.findAll();

  //? Change image data to be URL ?//
  const mappedImage = tools.map((m) => {
    m.image = `${req.get("host")}/${m.image}`;
    return m;
  });

  return res.json({
    status: "success",
    data: mappedImage,
  });
};
