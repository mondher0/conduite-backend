import { Request, Response } from "express";
import BadRequest from "../errors/bad-request.error";
import { StatusCodes } from "http-status-codes";
import { AuthService } from "../services/auth.service";

// Register a new user i will updated later
export const register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please provide name, email, and password");
  }

  // Call the registerUser service to handle the registration logic
  const user = await AuthService.registerUser({ name, email, password });

  // Send the response
  res.json({
    status: StatusCodes.CREATED,
    message: "User registered successfully",
    user: {
      name: user.name,
      email: user.email,
    },
  });
};

// // Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;
  
  if (!email || !password) {
    throw new BadRequest("Please provide email or password or both");
  }
  const user = await AuthService.login({ email, password });
  res.json({
    status: StatusCodes.OK,
    message: "Logged in successfully",
    user: {
      name: user.name,
      email: user.email,
    },
    token: user.token,
  });
};
