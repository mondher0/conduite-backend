import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-api.error";
import { CustomError } from "../common/interfaces/custom-error.interface";

const errorHandlerMiddleware = (
  err: any, // You can replace `any` with a specific error type if you have one
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let customError: CustomError = {
    // Set default
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong, please try again later.",
  };

  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item: any) => item.message) // You can define a more specific type for `item`
      .join(",");
    customError.statusCode = StatusCodes.BAD_REQUEST; // 400
  }

  if (err.code && err.code === 11000) {
    customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue,
    )} field, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST; // 400
  }

  if (err.name === "CastError") {
    customError.msg = `No item found with id: ${err.value}.`;
    customError.statusCode = StatusCodes.NOT_FOUND; // 404
  }

  return res.status(customError.statusCode).json({ msg: customError.msg });
};

export default errorHandlerMiddleware;
