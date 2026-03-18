import { Router } from "express";
import { authMiddleware, commonController } from "../../container";

const commonRoute = Router();

commonRoute.get("/about", commonController.getAbout);
commonRoute.post("/about", authMiddleware.authenticate, commonController.upsertAbout);
commonRoute.patch("/about", authMiddleware.authenticate, commonController.upsertAbout);

export default commonRoute;
