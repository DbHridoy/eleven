import { Errors } from "../../constants/error-codes";
import { apiError } from "../../errors/api-error";
import { CommonRepository, AboutPayload } from "./common.repository";

export class CommonService {
  constructor(
    private commonRepo: CommonRepository,
    _salesRepRepo?: unknown,
    _productionManagerRepo?: unknown
  ) {}

  upsertAbout = async (body: Partial<AboutPayload>) => {
    return await this.commonRepo.upsertAbout(body);
  };

  getAbout = async () => {
    const about = await this.commonRepo.findAbout();

    if (!about) {
      throw new apiError(Errors.NotFound.code, "About not found");
    }

    return about;
  };
}
