import { Request, Response } from "express";
import Book from "../books/book.model";
import { bookSchema, updateBookSchema } from "./book.validation";
import { createBook, updateBook } from "./book.service";

class BookController {
  async addBook(req: Request, res: Response): Promise<Response> {
    try {
      const { value, error } = bookSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      const book = await createBook(value);
      return res.status(201).send(book);
    } catch (err: any) {
      // Handle errors and send appropriate response
      if (
        err.message === "Author not found." ||
        err.message === "Publisher not found."
      ) {
        return res.status(404).send(err.message);
      }

      return res.status(500).send(err.message);
    }
  }

  async getBooks(req: Request, res: Response): Promise<Response> {
    try {
      const books = await Book.findAll();
      return res.status(200).json(books);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updateBooks(req: Request, res: Response): Promise<Response> {
    try {
      const { value, error } = updateBookSchema.validate(req.body); // Joi validation
      if (error) return res.status(400).send(error.details[0].message);

      const updatedBook = await updateBook(Number(req.params.id), value);
      return res.status(200).send(updatedBook);
    } catch (err: any) {
      if (
        err.message === "Book not found." ||
        err.message === "Author not found." ||
        err.message === "Publisher not found."
      ) {
        return res.status(404).send(err.message);
      }
      return res.status(500).send(err.message);
    }
  }

  async deleteBook(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json({ message: "Book not found" });
      }
      await book.destroy();
      return res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the book" });
    }
  }
}

export default BookController;
