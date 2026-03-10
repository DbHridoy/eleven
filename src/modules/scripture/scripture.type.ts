import { z } from "zod";
import { createScriptureSchema, updateScriptureSchema } from "./scripture.schema";

export type CreateScriptureType = z.infer<typeof createScriptureSchema>;
export type UpdateScriptureType = z.infer<typeof updateScriptureSchema>;

export type ScriptureListQuery = {
  page?: string | number;
  limit?: string | number;
  sort?: string;
  search?: string;
  author?: string;
  title?: string;
  mode?: string;
  timeOfDay?: string;
};

export type ScriptureStats = {
  totalScriptures: number;
  recentlyAdded: number;
  lastUpdatedHoursAgo: number | null;
};
