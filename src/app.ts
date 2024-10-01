import express, { Request, Response, NextFunction } from "express";
import sequelize from "../src/config/db";
import bookRoutes from "../src/module/books/book.routes";
import authorRoutes from "../src/module/authors/author.routes";
import publisherRoutes from "../src/module/publishers/publisher.routes";
import authRoutes from "../src/module/authentication/auth.router";

const app = express();

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", bookRoutes);
app.use("/api", authorRoutes);
app.use("/api", publisherRoutes);

const PORT = process.env.PORT || 8000;

const syncAndStartServer = () => {
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database synced");
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err: Error) => {
      console.error("Failed to sync database:", err);
    });
};

syncAndStartServer();
