import { StatusCodes } from "http-status-codes";
import CustomApiError from "./custom-api.error";

class BadRequest extends CustomApiError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequest;
