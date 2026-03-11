import { Router } from "express";
import { authMiddleware, commonController } from "../../container";

const commonRoute = Router();

commonRoute.use(authMiddleware.authenticate);

commonRoute.get("/about", commonController.getAbout);
commonRoute.post("/about", commonController.upsertAbout);
commonRoute.patch("/about", commonController.upsertAbout);

export default commonRoute;
