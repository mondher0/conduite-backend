import { Request, Response } from "express";
import BadRequest from "../errors/bad-request.error";
import { AuthService } from "../services/auth.service";
import {
  LoginRequestDto,
  RegisterRequestDto,
} from "../common/interfaces/index.interface";

// Register a new user i will updated later
export const register = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password }: RegisterRequestDto = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please provide name, email, and password");
  }

  // Call the registerUser service to handle the registration logic
  const response = await AuthService.registerUser({ name, email, password });

  // Send the response
  res.json(response);
};

// // Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: LoginRequestDto = req.body;

  if (!email || !password) {
    throw new BadRequest("Please provide email or password or both");
  }
  const response = await AuthService.login({ email, password });
  res.json(response);
};
