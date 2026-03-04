import { Types } from "mongoose";
import User from "./user.model";

export class UserRepository {
  constructor() { }

  findUserById = async (id: string) => {
    return await User.findById(id).select("-password").lean();
  };

  findUserByEmail = async (email: string) => {
    const user = await User.findOne({ email }).lean();
    return user;
  };

  createUser = async (user: any) => {
    return await User.create(user);
  };

  updateUserPassword = async (id: Types.ObjectId, hashedPassword: string) => {
    return await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true }
    );
  };

  updateMyProfile = async (id: string, body: any) => {
    return await User.findByIdAndUpdate(id, body, { new: true })
      .select("-password")
      .lean();
  };

}
