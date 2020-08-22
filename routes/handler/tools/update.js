const { Tool } = require("../../../models");

const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  //? Retrieve data on body and create schema validator for Update Tool ?//
  const data = req.body;
  const schema = {
    name: "string|empty:false",
    image: "string|empty:false",
    url: "url|empty:false",
  };

  //? Start validation and Check if there's any error, system will auto response with error message ?//
  const validate = v.validate(data, schema);
  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  //? Get tool id and search by toolId ?//
  const toolId = req.params.id;
  const tool = await Tool.findByPk(toolId);

  //? Check if tool ID is not found, system will prompt error ?//
  if (!tool) {
    return res.status(404).json({
      status: "error",
      message: "Tool not Found",
    });
  }

  //? Update tool with data which fill in ?//
  await tool.update(data);

  return res.json({
    status: "success",
    data: tool,
  });
};
