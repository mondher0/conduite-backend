// Import the 'express' module along with 'Request' and 'Response' types from express
import express, { Request, Response } from "express";
import path from "path";
import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import notFoundMiddleware from "./middlewares/not-found.middleware";
import errorHandlerMiddleware from "./middlewares/error-handler.middleware";
import authRouter from "./routes/auth.route";

// Create an Express application
const app = express();

app.use("public", express.static(path.join(__dirname, "public")));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Specify the port number for the server
const port = process.env.PORT;

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send('<h1>Conduite-backend</h1><a href="/api-docs">Documentation</a>');
});
app.use("/api/v1/auth", authRouter);

// error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware as any);

// Start the server and listen on the specified port
app.listen(port, () => {
  // Log a message when the server is successfully running
  console.log(`is running on http://localhost:${port}`);
});
