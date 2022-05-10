const express = require("express");
const Book = require("../models/book");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/books", auth, async (req, res) => {
  const book = new Book({
    ...req.body,
  });

  try {
    await book.save();
    res.status(201).send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/books", auth, async (req, res) => {
  // const match = {};
  // const sort = {};
  // if (req.query.completed) {
  //   match.completed = req.query.completed === "true";
  // }

  // if (req.query.sortBy) {
  //   const parts = req.query.sortBy.split(":");
  //   sort[parts[0]] = parts[1] === "name" ? -1 : 1;
  // }

  // try {
  //   await req.user.populate({
  //     path: "books",
  //     match,
  //     options: {
  //       limit: parseInt(req.query.limit),
  //       skip: parseInt(req.query.skip),
  //       sort,
  //     },
  //   });

  //   res.send(req.user.books);
  // } catch (e) {
  //   res.status(500).send();
  // }
  try {
    const books = await Book.find({});

    if (!books) {
      return res.status(404).send();
    }
    res.send(books);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.get("/books/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const book = await Book.findOne({ _id });

    if (!book) {
      return res.status(404).send();
    }
    res.send(book);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

router.patch("/books/:id", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "imageURL", "author", "pages", "price"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates! " });
  }

  try {
    const book = await Book.findOne({
      _id: req.params.id,
    });

    if (!book) {
      return res.status(404).send();
    }

    updates.forEach((update) => {
      book[update] = req.body[update];
    });

    await book.save();

    res.send(book);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.delete("/books/:id", auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
    });
    if (!book) {
      res.status(404).send();
    }
    res.send(book);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
