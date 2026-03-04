import { z } from "zod";

// Base user schema
const UserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(), // fixed
  role: z.enum(["Admin"]),
  password: z.string(),
  profileImage: z.string(),
});

// Schema for updating user (other roles) — role all optional
export const UpdateUserSchemaForOtherRoles = UserSchema.omit({
  role: true,
  email: true,
}).partial();

