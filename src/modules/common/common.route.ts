import { Router } from "express";
import { authMiddleware, commonController } from "../../container";

const commonRoute = Router();

commonRoute.use(authMiddleware.authenticate);

commonRoute.post("/about", commonController.createAbout);
commonRoute.get("/about", commonController.getAllAbout);
commonRoute.get("/about/:id", commonController.getAboutById);
commonRoute.patch("/about/:id", commonController.updateAbout);
commonRoute.delete("/about/:id", commonController.deleteAbout);

export default commonRoute;
