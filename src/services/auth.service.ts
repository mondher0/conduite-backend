import { User } from "../entities/User.entity";
import { AppDataSource } from "../db/data-source";
import BadRequest from "../errors/bad-request.error";
import bcrypt from "bcrypt";

export class AuthService {
  // Define the repository once
  private static userRepository = AppDataSource.getRepository(User);

  static async registerUser({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    // Use the repository without repeating
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new BadRequest("User with this email already exists");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user;
  }

  static async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
