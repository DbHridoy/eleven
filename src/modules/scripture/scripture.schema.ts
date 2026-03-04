import { z } from "zod";

export const createScriptureSchema = z.object({
  author: z.string().min(1),
  title: z.string().min(1),
  content: z.string().min(1),
  mode: z.enum(["Dr. Bob", "Big Book Thumper"]),
  timeOfDay: z.enum(["Morning", "Midday", "Night"]),
});

export const updateScriptureSchema = createScriptureSchema.partial();
