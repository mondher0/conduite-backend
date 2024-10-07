import { Request, Response } from "express";
import BadRequest from "../errors/bad-request.error";

import { StatusCodes } from "http-status-codes";

// Register
export const register = async (req: Request, res: Response) => {
  const {
    name,
    email,
    password,
  }: { name: string; email: string; password: string } = req.body;
  if (!name || !email || !password) {
    throw new BadRequest("Please provide name, email and password");
  }
  res.json({
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
    message: "Logged in successfullsdsfsy",
    email,
  });
};
