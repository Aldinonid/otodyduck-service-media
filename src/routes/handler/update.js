const isBase64 = require("is-base64");
const base64Img = require("base64-img");

const Image = require("../../models/Image");

const fs = require("fs");
const path = require("path");
const Validator = require("fastest-validator");
const v = new Validator();

const { HOSTNAME } = process.env;

//* File handler using base64Img *//
module.exports = async (req, res) => {
  const imageId = req.params.id;
  const imageType = req.body.imageType;
  const image = req.body.image;
  const imageData = await Image.findById(imageId).exec();

  if (!imageData) {
    return res
      .status(404)
      .json({ status: "error", message: "Image not found" });
  }

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

      fs.unlink(path.join(imageData.image), (err) =>
        err ? console.log(`Error: ${err}`) : null
      );

      const filename = filepath.split("\\").pop().split("/").pop();

      imageData.image = `images/${imageType}/${filename}`;
      imageData.imageType = imageType;

      await imageData.save();

      imageData.image = `${HOSTNAME}/${imageData.image}`;

      return res.json({ status: "success", data: imageData });
    }
  );
};

//* File handler using multer *//

// module.exports = async (req, res) => {
//   const imageId = req.params.id;
//   const imageType = req.body.imageType;
//   const imageData = await Image.findById(imageId).exec();

//   if (!imageData) {
//     return res
//       .status(404)
//       .json({ status: "error", message: "Image not found" });
//   }

//   const schema = {
//     imageType: { type: "enum", values: ["tool", "course", "mentor", "user"] },
//   };

//   const validate = v.validate(req.body, schema);
//   if (validate.length) {
//     return res.status(400).json({ status: "error", message: validate });
//   }

//   if (req.file) {
//     fs.unlink(path.join(imageData.image), (err) =>
//       err ? console.log(`Error: ${err}`) : null
//     );
//     imageData.image = `images/${imageType}/${req.file.filename}`;
//     await imageData.save();
//   }

//   imageData.imageType = imageType;

//   await imageData.save();

//   imageData.image = `${HOSTNAME}/${imageData.image}`;

//   return res.json({ status: "success", data: imageData });
// };
