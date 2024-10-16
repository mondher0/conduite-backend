import { User } from "../entities/User.entity";
import { AppDataSource } from "../db/data-source";
import BadRequest from "../errors/bad-request.error";
import { comparePassword, hashPassword } from "../common/utils/hash.util";
import { generateToken } from "../common/utils/jwt.util";

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
    const hashedPassword = await hashPassword(password);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await this.userRepository.save(user);

    return user;
  }

  // login method
  static async login({ email, password }: { email: string; password: string }) {
    const user = await this.findByEmail(email);
    if (!user) {
      throw new BadRequest("Invalid email or password");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequest("Invalid password");
    }

    const token = generateToken({ id: user.id, email: user.email });

    return { ...user, token };
  }

  static async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }
}
