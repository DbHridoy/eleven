import { UserRepository } from "./user.repository";
import { HashUtils } from "../../utils/hash-utils";
import { Mailer } from "../../utils/mailer-utils";

type UpdateProfilePayload = {
  fullName?: string;
  password?: string;
  profileImage?: string;
};

export class UserService {
  constructor(
    private userRepo: UserRepository,
    private hashUtils: HashUtils,
    private mailer: Mailer
  ) { }

  

  getUserProfile = async (id: string) => {
    return await this.userRepo.findUserById(id);
  };

  getUserById = async (id: string) => {
    return await this.userRepo.findUserById(id)
  }

  updateMyProfile = async (id: string, body: UpdateProfilePayload) => {
    const updateBody: UpdateProfilePayload = { ...body };

    if (typeof updateBody.password === "string") {
      const password = updateBody.password.trim();

      if (!password) {
        delete updateBody.password;
      } else {
        updateBody.password = await this.hashUtils.hashPassword(password);
      }
    }

    return await this.userRepo.updateMyProfile(id, updateBody);
  };
}
