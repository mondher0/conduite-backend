import { Request, Response } from "express";
import { ContactUsRequestDto } from "../common/interfaces/index.interface";
import BadRequest from "../errors/bad-request.error";
import { ContactUsService } from "../services/contact-us.service";

export const contactUs = async (req: Request, res: Response): Promise<void> => {
  const { email, message }: ContactUsRequestDto = req.body;

  if (!email || !message) {
    throw new BadRequest("Please provide email and message");
  }

  const response = await ContactUsService.createContactUs({ email, message });
  res.json(response);
};

export const getAllContactUs = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const response = await ContactUsService.getAllContactUs();
  res.json(response);
};

export const getContactUsById = async (
  req: Request<{ id: string }>,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  const response = await ContactUsService.getContactUsById(id);
  res.json(response);
};
