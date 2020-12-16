const isBase64 = require("is-base64");
const base64Img = require("base64-img");

const Image = require("../../models/Image");

const Validator = require("fastest-validator");
const v = new Validator();

const { HOSTNAME } = process.env;

//* File handler using base64Img *//
module.exports = async (req, res) => {
  const imageType = req.body.imageType;
  const image = req.body.image;

  const schema = {
    imageType: { type: "enum", values: ["tool", "course", "user", "flow"] },
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).json({ status: "error", message: validate });
  }

  if (!isBase64(image, { mimeRequired: true })) {
    return res.status(400).json({ status: "error", message: "Invalid base64" });
  }

  base64Img.img(
    image,
    `./images/${imageType}`,
    Date.now(),
    async (err, filepath) => {
      err && res.status(400).json({ status: "error", message: err.message });

      const filename = filepath.split("\\").pop().split("/").pop();

      const imageCreate = await Image.create({
        imageType,
        image: `images/${imageType}/${filename}`,
      });

      return res.json({
        status: "success",
        data: {
          ...imageCreate._doc,
          image: `${HOSTNAME}/${imageCreate.image}`,
        },
      });
    }
  );
};

//* File handler using multer *//

// module.exports = async (req, res) => {
//   const imageType = req.body.imageType;
//   const schema = {
//     imageType: { type: "enum", values: ["tool", "course", "mentor", "user"] },
//   };

//   const validate = v.validate(req.body, schema);
//   if (validate.length) {
//     return res.status(400).json({ status: "error", message: validate });
//   }

//   if (!req.file) {
//     return res
//       .status(400)
//       .json({ status: "error", message: "Please insert a image" });
//   }

//   const imageCreate = await Image.create({
//     imageType,
//     image: `images/${imageType}/${req.file.filename}`,
//   });

//   return res.json({
//     status: "success",
//     data: {
//       ...imageCreate._doc,
//       image: `${HOSTNAME}/${imageCreate.image}`,
//     },
//   });
// };
