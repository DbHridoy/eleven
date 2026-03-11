import { z } from "zod";

// Base user schema
const UserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  role: z.enum(["Production Manager", "Sales Rep", "Admin"]),
  password: z.string(),
  profileImage: z.string().optional(),
  phoneNumber: z.string().optional(),
});

export const UpdateUserSchemaForOtherRoles = UserSchema.omit({
  role: true,
  email: true,
}).partial();
