// Import required modules
import express, { Request, Response } from "express";
import path from "path";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import notFoundMiddleware from "./middlewares/not-found.middleware";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import authRouter from "./routes/auth.route";
import contactUsRouter from "./routes/contact-us.route";
import { initializeDatabase } from "./db/connect";

// Create an Express application
const app = express();

// Static folder setup
app.use("/public", express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Specify the port number for the server
const port = process.env.PORT || 3000;

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send('<h1>Conduite-backend</h1><a href="/api-docs">Documentation</a>');
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/contact-us", contactUsRouter);

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware as any);

// Initialize the database and start the server
const start = async () => {
  try {
    await initializeDatabase();  // Wait for database initialization
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server due to database connection issue:", error);
  }
};

start(); // Start the server
