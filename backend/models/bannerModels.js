const mongoose = require("mongoose");
const bannerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Must enter the name of the Banner"],
  },
  headingLong: {
    type: String,
    required: [true, "there must be a main heading"],
  },
  headingShort: {
    type: String,
    required: [true, "there must be a short heading"],
  },
  buttonContent: {
    type: String,
    required: [true, "Enter the content of Button"],
  },
  Color: {
    color1: {
      type: String,
      default: "White",
    },
    color2: {
      type: String,
      default: "White",
    },
    color3: {
      type: String,
      default: "White",
    },
    color4: {
      type: String,
      default: "White",
    },
    color5: {
      type: String,
      default: "White",
    },
    color6: {
      type: String,
      default: "White",
    },
    color7: {
      type: String,
      default: "White",
    },
    color8: {
      type: String,
      default: "White",
    },
    color9: {
      type: String,
      default: "White",
    },
    color10: {
      type: String,
      default: "White",
    },
    color11: {
      type: String,
      default: "White",
    },
    color12: {
      type: String,
      default: "White",
    },
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("Banner", bannerSchema);
