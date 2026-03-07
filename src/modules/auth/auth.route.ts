import { Router } from "express";
import { validate } from "../../middlewares/validate.middleware";
import { changePasswordSchema, createUserSchema, loginUserSchema } from "./auth.schema";
import { authController, authMiddleware } from "../../container";

const authRoute = Router();


// Register route
authRoute.post(
  "/register",
  validate(createUserSchema),
  authController.register
);

authRoute.post("/login", validate(loginUserSchema), authController.loginUser);

authRoute.post("/send-otp", authController.sendOtp);
authRoute.post("/verify-otp", authController.verifyOtp);
authRoute.post("/set-new-password", authController.setNewPassword);
authRoute.post("/refresh-token", authController.refreshToken);
authRoute.post("/logout", authController.logout);
authRoute.post(
  "/change-password",
  authMiddleware.authenticate,
  validate(changePasswordSchema),
  authController.changePassword
);

export default authRoute;
