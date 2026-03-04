import { Errors } from "../../constants/error-codes";
import { apiError } from "../../errors/api-error";
import { CommonRepository, AboutPayload } from "./common.repository";

export class CommonService {
  constructor(
    private commonRepo: CommonRepository,
    _salesRepRepo?: unknown,
    _productionManagerRepo?: unknown
  ) {}

  createAbout = async (body: AboutPayload) => {
    return await this.commonRepo.createAbout(body);
  };

  getAllAbout = async () => {
    return await this.commonRepo.findAllAbout();
  };

  getAboutById = async (id: string) => {
    const about = await this.commonRepo.findAboutById(id);

    if (!about) {
      throw new apiError(Errors.NotFound.code, "About not found");
    }

    return about;
  };

  updateAbout = async (id: string, body: Partial<AboutPayload>) => {
    const about = await this.commonRepo.updateAboutById(id, body);

    if (!about) {
      throw new apiError(Errors.NotFound.code, "About not found");
    }

    return about;
  };

  deleteAbout = async (id: string) => {
    const about = await this.commonRepo.deleteAboutById(id);

    if (!about) {
      throw new apiError(Errors.NotFound.code, "About not found");
    }

    return about;
  };
}
