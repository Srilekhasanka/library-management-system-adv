import Joi from "joi";

// Define the schema for creating a publisher
export const publisherSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
});

// Define the schema for updating a publisher
export const updatePublisherSchema = Joi.object({
  name: Joi.string().min(3).optional(),
});
