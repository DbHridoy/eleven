import About from "./about.model";

export interface AboutPayload {
  about: string;
}

export class CommonRepository {
  private findSingletonQuery = () => {
    return About.findOne({ singletonKey: "default" }).sort({ createdAt: 1 });
  };

  private findFallbackQuery = () => {
    return About.findOne().sort({ createdAt: 1 });
  };

  private findSingletonDocument = async () => {
    return await this.findSingletonQuery().orFail().catch(async () => {
      return await this.findFallbackQuery();
    });
  };

  upsertAbout = async (body: Partial<AboutPayload>) => {
    const existingAbout = await this.findSingletonDocument();

    if (existingAbout) {
      return await About.findByIdAndUpdate(
        existingAbout._id,
        { ...body, singletonKey: "default" },
        { new: true }
      ).lean();
    }

    return await About.create({
      singletonKey: "default",
      about: body.about ?? "",
    });
  };

  findAbout = async () => {
    const singletonAbout = await this.findSingletonQuery().lean();

    if (singletonAbout) {
      return singletonAbout;
    }

    return await this.findFallbackQuery().lean();
  };
}
