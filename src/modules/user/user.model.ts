import { InferSchemaType, Schema, model } from "mongoose";

const USER_ROLES = ["Production Manager", "Sales Rep", "Admin"] as const;

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    profileImage: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    role: {
      type: String,
      required: true,
      enum: USER_ROLES,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export type UserDocument = InferSchemaType<typeof userSchema>;
export const userRoles = [...USER_ROLES];

const User = model<UserDocument>("User", userSchema);

export default User;
