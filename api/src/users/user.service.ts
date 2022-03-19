import { Injectable } from "@nestjs/common";
import { UserRepository } from "./user.repositotry";

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository
  ) {}

  async getUser(username: String) {
    const user = await this.userRepository.findOne({where: {username}});
    return user;
  }
}