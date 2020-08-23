const { Tool } = require("../../../models");

const isBase64 = require("is-base64");
const base64Img = require("base64-img");
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

    //? Insert new tool with data which fill in ?//
    const createTool = await Tool.create(toolData);

    return res.json({
      status: "success",
      data: {
        ...createTool.dataValues,
        image: `${req.get("host")}/${createTool.image}`,
      },
    });
  });
};
