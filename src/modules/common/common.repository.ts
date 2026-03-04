import About from "./about.model";

export interface AboutPayload {
  about: string;
}

export class CommonRepository {
  createAbout = async (body: AboutPayload) => {
    return await About.create(body);
  };

  findAllAbout = async () => {
    return await About.find().sort({ createdAt: -1 }).lean();
  };

  findAboutById = async (id: string) => {
    return await About.findById(id).lean();
  };

  updateAboutById = async (id: string, body: Partial<AboutPayload>) => {
    return await About.findByIdAndUpdate(id, body, { new: true }).lean();
  };

  deleteAboutById = async (id: string) => {
    return await About.findByIdAndDelete(id).lean();
  };
}
