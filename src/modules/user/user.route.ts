import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { UpdateUserSchemaForOtherRoles } from "./user.schema";
import { authMiddleware, userController } from "../../container";
import { uploadFile } from "../../middlewares/upload.middleware";

const userRoute = Router();

userRoute.use(authMiddleware.authenticate)
userRoute.get(
  "/me",
  userController.getMyProfile
);
userRoute.patch(
  "/me",
  validate(UpdateUserSchemaForOtherRoles),
  uploadFile({
    fieldName: "profileImage",
    uploadType: "single",
  }),
  userController.updateMyProfile
);
export default userRoute;
