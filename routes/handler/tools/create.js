const { Tool } = require("../../../models");

const fs = require("fs");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  //? Retrieve data on body and create schema validator for Create new Tool ?//
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

  //? Insert new tool with data which fill in ?//
  const createTool = await Tool.create(data);

  return res.json({
    status: "success",
    data: createTool,
  });
};
