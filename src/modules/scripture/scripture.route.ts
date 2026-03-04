import { Router } from "express";
import { authMiddleware, scriptureController } from "../../container";
import { validate } from "../../middlewares/validate.middleware";
import {
  createScriptureSchema,
  updateScriptureSchema,
} from "./scripture.schema";

const scriptureRoute = Router();

scriptureRoute.use(authMiddleware.authenticate);

scriptureRoute.post(
  "/",
  validate(createScriptureSchema),
  scriptureController.createScripture
);

scriptureRoute.get("/", scriptureController.getAllScriptures);
scriptureRoute.get("/:id", scriptureController.getScriptureById);
scriptureRoute.patch(
  "/:id",
  validate(updateScriptureSchema),
  scriptureController.updateScripture
);
scriptureRoute.delete("/:id", scriptureController.deleteScripture);

export default scriptureRoute;
