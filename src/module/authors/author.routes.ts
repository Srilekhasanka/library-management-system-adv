import express, { Request, Response } from "express";
import AuthorController from "../../../src/module/authors/author.controller";
import { protect } from "../../../src/module/authentication/auth.middleware";

const router = express.Router();
const authorController = new AuthorController();

router.post(
  "/authors",
  protect,
  authorController.addAuthor.bind(authorController)
);

router.get(
  "/authors",
  protect,
  authorController.getAuthors.bind(authorController)
);

router.put(
  "/authors/:id",
  authorController.updateAuthors.bind(authorController)
);

router.delete(
  "/authors/:id",
  authorController.deleteAuthor.bind(authorController)
);

export default router;
