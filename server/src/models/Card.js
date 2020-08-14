const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    listId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "List",
    },
    order: {
      type: Number,
      default: 0,
    },
    content: {
      type: String,
      required: true,
    },
    image: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Card", schema);
