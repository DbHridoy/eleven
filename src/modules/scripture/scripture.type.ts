import { z } from "zod";
import { createScriptureSchema, updateScriptureSchema } from "./scripture.schema";

export type createScriptureType = z.infer<typeof createScriptureSchema>;
export type updateScriptureType = z.infer<typeof updateScriptureSchema>;

export type scriptureListQueryType = {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  search?: string;
  author?: string;
  title?: string;
  mode?: "Dr. Bob" | "Big Book Thumper" | string;
  timeOfDay?: "Morning" | "Midday" | "Night" | string;
};
