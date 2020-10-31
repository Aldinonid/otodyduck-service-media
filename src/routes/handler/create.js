const Image = require("../../models/Image");

const Validator = require("fastest-validator");
const v = new Validator();

const { HOSTNAME } = process.env;

module.exports = async (req, res) => {
  const imageType = req.body.imageType;
  const schema = {
    imageType: { type: "enum", values: ["tool", "course", "mentor", "user"] },
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  if (!req.file) {
    return res
      .status(400)
      .json({ status: "error", message: "Please insert a image" });
  }

  const imageCreate = await Image.create({
    imageType,
    image: `images/${imageType}/${req.file.filename}`,
  });

  return res.json({
    status: "success",
    data: {
      ...imageCreate._doc,
      image: `${HOSTNAME}/${imageCreate.image}`,
    },
  });
};
