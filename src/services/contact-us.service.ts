import {
  ContactUs,
  ContactUsRequestDto,
  ServiceResponse,
} from "../common/interfaces/index.interface";
import { AppDataSource } from "../db/data-source";
import { ContactUS } from "../entities";

export class ContactUsService {
  private static contactUsRepository = AppDataSource.getRepository(ContactUS);

  static async createContactUs({
    email,
    message,
  }: ContactUsRequestDto): Promise<ServiceResponse> {
    const contactUs = new ContactUS();
    contactUs.email = email;
    contactUs.message = message;

    await this.contactUsRepository.save(contactUs);

    const response: ServiceResponse = {
      success: true,
      message: "Message sent successfully",
    };

    return response;
  }

  static async getAllContactUs(): Promise<ServiceResponse<ContactUs[]>> {
    const contactUs = await this.contactUsRepository.find();

    const response: ServiceResponse<ContactUS[]> = {
      success: true,
      message: "Get all contact us successfully",
      data: contactUs,
    };

    return response;
  }

  static async getContactUsById(
    id: string,
  ): Promise<ServiceResponse<ContactUs>> {
    const contactUs = await this.contactUsRepository.findOne({
      where: {
        id,
      },
    });

    if (!contactUs) {
      return {
        success: false,
        message: "Contact us not found",
      };
    }

    const response: ServiceResponse<ContactUs> = {
      success: true,
      message: "Get contact us by id successfully",
      data: contactUs,
    };

    return response;
  }
}
