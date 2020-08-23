const { Tool } = require("../../../models");

const fs = require("fs");
const isBase64 = require("is-base64");
const base64Img = require("base64-img");
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

  //? Check if image on tool ID is not found, system will prompt error ?//
  fs.unlink(`./public/${tool.image}`, async (err) => {
    if (err) {
      return res
        .status(404)
        .json({ status: "error", message: "Image not Found" });
    }
  });

  //? Check image base64 type ?//
  const image = req.body.image;
  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "Invalid base64" });
  }

  //? Insert image to folder and name it based on time now ?//
  base64Img.img(image, "./public/images", Date.now(), async (err, filepath) => {
    err && res.status(400).json({ status: "error", message: err.message });

    //? Change filename to be only time ?//
    const filename = filepath.split("\\").pop();

    const toolData = {
      name: data.name,
      image: `images/${filename}`,
      url: data.url,
    };

    //? Update tool with data which fill in ?//
    const updateTool = await tool.update(toolData);

    return res.json({
      status: "success",
      data: {
        ...updateTool.dataValues,
        image: `${req.get("host")}/${updateTool.image}`,
      },
    });
  });
};
