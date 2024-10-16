import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Unauthorized from "../errors/unauthorized.error";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const authenticationMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthorized("No token provided");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };

    req.user = { userId: decoded.userId }; // Attach the userId to the request
    next();
  } catch (error) {
    throw new Unauthorized("Not authorized to access this route");
  }
};

export default authenticationMiddleware;
