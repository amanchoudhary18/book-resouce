const mongoose = require("mongoose");
const { number } = require("sharp/lib/is");
const validator = require("validator");

const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    imageURL: {
      type: String,
      trim: true,
    },

    author: {
      type: String,
      required: true,
      trim: true,
    },

    pages: {
      type: number,
      required: true,
    },

    price: {
      type: number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
