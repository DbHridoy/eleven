import Scripture from "./scripture.model";
import { buildDynamicSearch } from "../../utils/dynamic-search-utils";
import { scriptureListQueryType } from "./scripture.type";

export class ScriptureRepository {
  createScripture = async (body: any) => {
    return await Scripture.create(body);
  };

  findAllScriptures = async (queryParams: scriptureListQueryType) => {
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

  updateScriptureById = async (id: string, body: any) => {
    return await Scripture.findByIdAndUpdate(id, body, { new: true }).lean();
  };

  deleteScriptureById = async (id: string) => {
    return await Scripture.findByIdAndDelete(id).lean();
  };
}
