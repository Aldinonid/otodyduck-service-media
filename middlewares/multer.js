const multer = require("multer");
const path = require("path");

const extensionImage = (imageName) => {
  const extension = imageName.split(".");
  return `.${extension[extension.length - 1]}`;
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images/${req.body.imageType}`);
  },
  filename: (req, file, cb) => {
    cb(null, new Date().getTime() + extensionImage(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    return cb("Error: Images Only !!!");
  }
};

const upload = multer({ storage: fileStorage, fileFilter: fileFilter }).single(
  "image"
);

module.exports = { upload };
