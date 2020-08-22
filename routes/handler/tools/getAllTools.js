const { Tool } = require("../../../models");

module.exports = async (req, res) => {
  const tools = await Tool.findAll();

  return res.json({
    status: "success",
    data: tools,
  });
};
