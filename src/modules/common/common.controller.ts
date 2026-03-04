import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../../constants/status-codes";
import { asyncHandler } from "../../utils/async-handler";
import { TypedRequestBody, TypedRequestParams } from "../../types/request.type";
import { CommonService } from "./common.service";
import { AboutPayload, CommonRepository } from "./common.repository";

export class CommonController {
  constructor(
    private commonService: CommonService,
    _commonRepository?: CommonRepository
  ) {}

  createAbout = asyncHandler(
    async (
      req: TypedRequestBody<AboutPayload>,
      res: Response,
      _next: NextFunction
    ) => {
      const about = await this.commonService.createAbout(req.body);

      res.status(HttpCodes.Created).json({
        success: true,
        message: "About created successfully",
        data: about,
      });
    }
  );

  getAllAbout = asyncHandler(
    async (_req: Request, res: Response, _next: NextFunction) => {
      const about = await this.commonService.getAllAbout();

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About fetched successfully",
        data: about,
      });
    }
  );

  getAboutById = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }>,
      res: Response,
      _next: NextFunction
    ) => {
      const about = await this.commonService.getAboutById(req.params.id);

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About fetched successfully",
        data: about,
      });
    }
  );

  updateAbout = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }, Partial<AboutPayload>>,
      res: Response,
      _next: NextFunction
    ) => {
      const about = await this.commonService.updateAbout(req.params.id, req.body);

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About updated successfully",
        data: about,
      });
    }
  );

  deleteAbout = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }>,
      res: Response,
      _next: NextFunction
    ) => {
      const about = await this.commonService.deleteAbout(req.params.id);

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "About deleted successfully",
        data: about,
      });
    }
  );
}
