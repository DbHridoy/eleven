import { Router } from "express";
import { authMiddleware, commonController } from "../../container";

const commonRoute = Router();

commonRoute.get("/about",authMiddleware.authenticate, commonController.getAbout);
commonRoute.post("/about", commonController.upsertAbout);
commonRoute.patch("/about", commonController.upsertAbout);

export default commonRoute;
