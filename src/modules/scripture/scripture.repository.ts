import Scripture from "./scripture.model";
import { buildDynamicSearch } from "../../utils/dynamic-search-utils";
import {
  CreateScriptureType,
  ScriptureListQuery,
  ScriptureStats,
  UpdateScriptureType,
} from "./scripture.type";

export class ScriptureRepository {
  createScripture = async (body: CreateScriptureType) => {
    return await Scripture.create(body);
  };

  findAllScriptures = async (queryParams: ScriptureListQuery) => {
    const { filter, search, options } = buildDynamicSearch(Scripture, queryParams);
    const mongoQuery = search?.$or ? { $and: [filter, search] } : filter;

    const [data, total] = await Promise.all([
      Scripture.find(mongoQuery)
        .sort(options.sort || { createdAt: -1 })
        .skip(options.skip || 0)
        .limit(options.limit || 0)
        .lean(),
      Scripture.countDocuments(mongoQuery),
    ]);

    const page = Number(queryParams.page) || 1;
    const limit = Number(queryParams.limit) || data.length || 1;
    const totalPages = limit > 0 ? Math.ceil(total / limit) : 1;

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  };

  findScriptureById = async (id: string) => {
    return await Scripture.findById(id).lean();
  };

  updateScriptureById = async (id: string, body: UpdateScriptureType) => {
    return await Scripture.findByIdAndUpdate(id, body, { new: true }).lean();
  };

  deleteScriptureById = async (id: string) => {
    return await Scripture.findByIdAndDelete(id).lean();
  };

  getScriptureStats = async (): Promise<ScriptureStats> => {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const [totalScriptures, recentlyAdded, latestScripture] = await Promise.all([
      Scripture.countDocuments(),
      Scripture.countDocuments({ createdAt: { $gte: last24Hours } }),
      Scripture.findOne().sort({ createdAt: -1 }).select("createdAt").lean(),
    ]);

    const lastUpdatedHoursAgo = latestScripture?.createdAt
      ? Math.floor(
          (Date.now() - new Date(latestScripture.createdAt).getTime()) /
            (60 * 60 * 1000)
        )
      : null;

    return {
      totalScriptures,
      recentlyAdded,
      lastUpdatedHoursAgo,
    };
  };

  getRecentScriptures = async (limit = 5) => {
    return await Scripture.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  };
}
