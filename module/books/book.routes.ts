import express from "express";

import BookController from "./book.controller";
import { protect } from "../authentication/auth.middleware";

const router = express.Router();
const bookController = new BookController();

// Define routes for books
router.post("/books", protect, bookController.addBook.bind(bookController));
router.get("/books", protect, bookController.getBooks.bind(bookController));
router.put(
  "/books/:id",
  protect,
  bookController.updateBooks.bind(bookController)
);
router.delete(
  "/books/:id",
  protect,
  bookController.deleteBook.bind(bookController)
);

// Export the router
export default router;
