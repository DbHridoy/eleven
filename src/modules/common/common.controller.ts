import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../../constants/status-codes";
import { asyncHandler } from "../../utils/async-handler";
import { TypedRequestBody } from "../../types/request.type";
import { CommonService } from "./common.service";
import { AboutPayload, CommonRepository } from "./common.repository";

export class CommonController {
  constructor(
    private commonService: CommonService,
    _commonRepository?: CommonRepository
  ) {}

  upsertAbout = asyncHandler(
    async (
      req: TypedRequestBody<Partial<AboutPayload>>,
      res: Response,
      _next: NextFunction
    ) => {
      const about = await this.commonService.upsertAbout(req.body);

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About updated successfully",
        data: about,
      });
    }
  );

  getAbout = asyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const about = await this.commonService.getAbout();

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About fetched successfully",
        data: about,
      });
    }
  );
}
