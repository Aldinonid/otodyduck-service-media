const { Tool } = require("../../../models");

const fs = require("fs");

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

  //? Check if image on tool ID is not found, system will prompt error ?//
  fs.unlink(`./public/${tool.image}`, async (err) => {
    if (err) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not Found" });
    }
  });

  //? Delete tool by ID which fill in params ?//
  await tool.destroy({
    where: { id: toolId },
  });

  return res.json({
    status: "success",
    message: "Tool has been deleted",
  });
};
