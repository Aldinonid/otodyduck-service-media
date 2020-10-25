const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    imageType: {
      type: String,
      enum: ["tool", "course", "user", "mentor"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Images", ImageSchema);
