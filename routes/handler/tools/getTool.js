const { Tool } = require("../../../models");

module.exports = async (req, res) => {
  //? Retrieve data on param and find tool by ID ?//
  const toolId = req.params.id;
  const tool = await Tool.findByPk(toolId);

  //? Check if tool ID is not found, system will prompt error ?//
  if (!tool) {
    return res.status(404).json({
      status: "error",
      message: "Tool not Found",
    });
  }

  //? Change image data to be URL ?//
  tool.image = `${req.get("host")}/${tool.image}`;

  return res.json({
    status: "success",
    data: tool,
  });
};
