import { Request, Response } from "express";
import Authors from "../authors/author.model";
import { authorSchema, updateAuthorSchema } from "./author.validation";
import { createAuthor, updateAuthor } from "./author.service";

class AuthorController {
  // Method to add an author
  async addAuthor(req: Request, res: Response): Promise<void> {
    try {
      const { value, error } = authorSchema.validate(req.body);
      if (error) {
        res.status(400).json({ error: error.details[0].message });
        return;
      }
      const author = await createAuthor(value);
      res.status(201).json(author);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Method to retrieve all authors
  async getAuthors(req: Request, res: Response): Promise<void> {
    try {
      const authors = await Authors.findAll();
      res.status(200).json(authors);
    } catch (err) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  // Method to update an author
  async updateAuthors(req: Request, res: Response): Promise<void> {
    try {
      const id = Number(req.params.id);

      if (!id || isNaN(id)) {
        res.status(400).send("Invalid Author ID");
        return;
      }

      const { value, error } = updateAuthorSchema.validate(req.body);
      if (error) {
        res.status(400).send(error.details[0].message);
        return;
      }

      const resp = await updateAuthor(id, value);
      res.status(200).send(resp);
    } catch (err: any) {
      console.log(err);
      res.status(500).send(err.message);
    }
  }

  // Method to delete an author
  async deleteAuthor(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const author = await Authors.findByPk(id);

      if (!author) {
        res.status(404).json({ message: "Author not found" });
        return;
      }

      await author.destroy();
      res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the author" });
    }
  }
}

export default AuthorController;
