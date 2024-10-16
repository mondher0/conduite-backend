import { Request, Response } from "express";
import BadRequest from "../errors/bad-request.error";

import { StatusCodes } from "http-status-codes";
import { User } from "../entities/User.entity";
import { AppDataSource } from "../db/data-source";

// Register will updated later
export const register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;

  if (!name || !email || !password) {
    throw new BadRequest("Please provide name, email, and password");
  }

  // Create a new user instance
  const user = new User();
  user.name = name;
  user.email = email;
  user.password = password; // i will hash this password later

  // Save the user to the database
  const userRepository = AppDataSource.getRepository(User);
  await userRepository.save(user);

  // Send the response
  res.status(StatusCodes.CREATED).json({
    status: StatusCodes.CREATED,
    message: "User registered successfully",
    user: {
      name,
      email,
    },
  });
};

// Login
export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password }: { email: string; password: string } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email or password or both");
  }
  res.json({
    status: StatusCodes.OK,
    message: "Logged in successfully",
    email,
  });
};
