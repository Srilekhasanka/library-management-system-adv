import Joi from "joi";

// Define the schema for creating a book
export const bookSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  publicationYear: Joi.number().integer(),
  AuthorId: Joi.number().integer().required(),
  PublisherId: Joi.number().integer().required(),
});

// Define the schema for updating a book
export const updateBookSchema = Joi.object({
  title: Joi.string().min(3).optional(),
  publicationYear: Joi.number()
    .integer()
    .min(1500)
    .max(new Date().getFullYear())
    .optional(),
  AuthorId: Joi.number().optional(),
  PublisherId: Joi.number().optional(),
});
