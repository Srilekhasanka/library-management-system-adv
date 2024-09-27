import Joi from "joi";

// Define the schema for creating an author
export const authorSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
});

// Define the schema for updating an author
export const updateAuthorSchema = Joi.object({
  name: Joi.string().min(3).max(100).optional(),
});
