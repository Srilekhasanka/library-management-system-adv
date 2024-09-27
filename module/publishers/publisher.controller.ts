import { Request, Response } from "express";
import Publisher from "../publishers/publisher.model";
import { publisherSchema, updatePublisherSchema } from "./publisher.validation";
import {
  createPublisher,
  updatePublisher,
} from "../publishers/publisher.service";

class PublisherController {
  async addPublisher(req: Request, res: Response): Promise<Response> {
    try {
      const { value, error } = publisherSchema.validate(req.body);
      if (error)
        return res.status(400).json({ error: error.details[0].message });

      const publisher = await createPublisher(value);
      return res.status(201).json(publisher);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async getPublishers(req: Request, res: Response): Promise<Response> {
    try {
      const publishers = await Publisher.findAll();
      return res.status(200).json(publishers);
    } catch (err) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async updatePublishers(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const publisherId = Number(id);

      if (!publisherId || isNaN(publisherId)) {
        return res.status(400).send("Invalid Publisher ID");
      }

      const { value, error } = updatePublisherSchema.validate(req.body);
      if (error) return res.status(400).send(error.details[0].message);

      // Check if the publisher exists
      const resp = await updatePublisher(publisherId, value);

      return res.status(200).send(resp);
    } catch (err: any) {
      return res.status(500).send(err.message);
    }
  }

  async deletePublisher(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    try {
      const publisher = await Publisher.findByPk(id);

      if (!publisher) {
        return res.status(404).json({ message: "Publisher not found" });
      }

      // Delete the publisher
      await publisher.destroy();

      return res
        .status(200)
        .json({ message: "Publisher deleted successfully" });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "An error occurred while deleting the publisher" });
    }
  }
}

export default PublisherController;
