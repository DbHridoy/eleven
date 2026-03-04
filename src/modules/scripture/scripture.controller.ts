import { NextFunction, Request, Response } from "express";
import { HttpCodes } from "../../constants/status-codes";
import { asyncHandler } from "../../utils/async-handler";
import {
  TypedRequestBody,
  TypedRequestParams,
  TypedRequestQuery,
} from "../../types/request.type";
import {
  createScriptureType,
  scriptureListQueryType,
  updateScriptureType,
} from "./scripture.type";
import { ScriptureService } from "./scripture.service";

export class ScriptureController {
  constructor(private scriptureService: ScriptureService) {}

  createScripture = asyncHandler(
    async (
      req: TypedRequestBody<createScriptureType>,
      res: Response,
      _next: NextFunction
    ) => {
      const scripture = await this.scriptureService.createScripture(req.body);

      res.status(HttpCodes.Created).json({
        success: true,
        message: "Scripture created successfully",
        data: scripture,
      });
    }
  );

  getAllScriptures = asyncHandler(
    async (
      req: TypedRequestQuery<scriptureListQueryType>,
      res: Response,
      _next: NextFunction
    ) => {
      const result = await this.scriptureService.getAllScriptures(req.query);

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "Scriptures fetched successfully",
        data: result.data,
        meta: result.meta,
      });
    }
  );

  getScriptureById = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }>,
      res: Response,
      _next: NextFunction
    ) => {
      const scripture = await this.scriptureService.getScriptureById(
        req.params.id
      );

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "Scripture fetched successfully",
        data: scripture,
      });
    }
  );

  updateScripture = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }, updateScriptureType>,
      res: Response,
      _next: NextFunction
    ) => {
      const scripture = await this.scriptureService.updateScripture(
        req.params.id,
        req.body
      );

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "Scripture updated successfully",
        data: scripture,
      });
    }
  );

  deleteScripture = asyncHandler(
    async (
      req: TypedRequestParams<{ id: string }>,
      res: Response,
      _next: NextFunction
    ) => {
      const scripture = await this.scriptureService.deleteScripture(
        req.params.id
      );

      res.status(HttpCodes.Ok).json({
        success: true,
        message: "Scripture deleted successfully",
        data: scripture,
      });
    }
  );
}
