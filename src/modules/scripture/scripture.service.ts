import { Errors } from "../../constants/error-codes";
import { apiError } from "../../errors/api-error";
import {
  CreateScriptureType,
  ScriptureListQuery,
  UpdateScriptureType,
} from "./scripture.type";
import { ScriptureRepository } from "./scripture.repository";

export class ScriptureService {
  constructor(private scriptureRepo: ScriptureRepository) {}

  sanitizeListQuery = (query: ScriptureListQuery): ScriptureListQuery => {
    const pageRaw = Number(query.page);
    const limitRaw = Number(query.limit);

    const page = Number.isFinite(pageRaw) && pageRaw > 0 ? Math.floor(pageRaw) : 1;
    const limit =
      Number.isFinite(limitRaw) && limitRaw > 0
        ? Math.min(Math.floor(limitRaw), 100)
        : 10;

    const allowedSortFields = [
      "createdAt",
      "updatedAt",
      "author",
      "title",
      "mode",
      "timeOfDay",
    ];

    const sortTokens = String(query.sort || "-createdAt")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
      .filter((item) => {
        const field = item.startsWith("-") ? item.slice(1) : item;
        return allowedSortFields.includes(field);
      });

    const sort = sortTokens.length > 0 ? sortTokens.join(",") : "-createdAt";

    const sanitized: ScriptureListQuery = {
      page,
      limit,
      sort,
    };

    if (typeof query.search === "string" && query.search.trim()) {
      sanitized.search = query.search.trim();
    }

    const filterFields = ["author", "title", "mode", "timeOfDay"] as const;

    filterFields.forEach((field) => {
      const value = query[field];
      if (typeof value === "string" && value.trim()) {
        sanitized[field] = value.trim();
      }
    });

    return sanitized;
  };

  createScripture = async (body: CreateScriptureType) => {
    return await this.scriptureRepo.createScripture(body);
  };

  getAllScriptures = async (query: ScriptureListQuery) => {
    const sanitizedQuery = this.sanitizeListQuery(query);
    return await this.scriptureRepo.findAllScriptures(sanitizedQuery);
  };

  getScriptureById = async (id: string) => {
    const scripture = await this.scriptureRepo.findScriptureById(id);

    if (!scripture) {
      throw new apiError(Errors.NotFound.code, "Scripture not found");
    }

    return scripture;
  };

  updateScripture = async (id: string, body: UpdateScriptureType) => {
    const scripture = await this.scriptureRepo.updateScriptureById(id, body);

    if (!scripture) {
      throw new apiError(Errors.NotFound.code, "Scripture not found");
    }

    return scripture;
  };

  deleteScripture = async (id: string) => {
    const scripture = await this.scriptureRepo.deleteScriptureById(id);

    if (!scripture) {
      throw new apiError(Errors.NotFound.code, "Scripture not found");
    }

    return scripture;
  };
}
