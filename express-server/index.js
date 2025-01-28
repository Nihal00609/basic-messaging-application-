import cors from "cors";
import Express from "express";
import "dotenv/config";

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import messageRoutes from "./routes/messages.js";
import { connectDB } from "./database/db.js";
import verifyToken from "./middleware/authMiddleware.js";

const server = Express();

server.use(cors());

// middlewares
server.use(Express.json({ limit: "100mb" }));

// Database
connectDB();

// Routes
server.use("/auth", authRoutes);
server.use("/users", verifyToken, userRoutes);
server.use("/messages", verifyToken, messageRoutes);

server.use("*", async (req, res, next) => {
  return res.status(404).json({
    status: false,
    message: "Route not found",
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server Started on http://localhost:${PORT}`);
});

export default { server };
