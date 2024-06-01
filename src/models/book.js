import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
