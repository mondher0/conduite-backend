import * as dotenv from "dotenv";

dotenv.config();

import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET as string; // Store this in environment variables for security

export const generateToken = (payload: object): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: process.env.JWT_LIFETIME }); // Generate a token that expires in 1 hour
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET); // Verify and decode the token
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
};
