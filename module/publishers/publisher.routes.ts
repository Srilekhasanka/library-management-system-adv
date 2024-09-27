import express, { Request, Response } from "express";
import PublisherController from "./publisher.controller";
import { protect } from "../authentication/auth.middleware";

const router = express.Router();
const publisherController = new PublisherController();

// Define routes for publishers
router.post("/publishers", protect, (req: Request, res: Response) =>
  publisherController.addPublisher(req, res)
);

router.get("/publishers", protect, (req: Request, res: Response) =>
  publisherController.getPublishers(req, res)
);

router.put("/publishers/:id", (req: Request, res: Response) =>
  publisherController.updatePublishers(req, res)
);

router.delete("/publishers/:id", (req: Request, res: Response) =>
  publisherController.deletePublisher(req, res)
);

// No need for duplicate routes without middleware
// The ones without the 'protect' middleware have been removed

export default router;
