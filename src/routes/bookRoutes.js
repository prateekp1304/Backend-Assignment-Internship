import express from "express";
import Book from "../models/book.js";

const router = express.Router();

// Create new book
router.post("/books", async (req, res) => {
  const book = new Book({
    name: req.body.name,
    img: req.body.img,
    summary: req.body.summary,
  });

  try {
    const savedBook = await book.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all books
router.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get book by ID
router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update book by ID
router.put("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (req.body.name != null) {
      book.name = req.body.name;
    }
    if (req.body.img != null) {
      book.img = req.body.img;
    }
    if (req.body.summary != null) {
      book.summary = req.body.summary;
    }

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete book by ID
router.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (book == null) {
      return res.status(404).json({ message: "Book not found" });
    }

    await book.remove();
    res.json({ message: "Deleted Book" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
