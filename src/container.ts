import { HashUtils } from "./utils/hash-utils";
import { JwtUtils } from "./utils/jwt-utils";
import { Mailer } from "./utils/mailer-utils";
import { CommonRepository } from "./modules/common/common.repository";
import { CommonService } from "./modules/common/common.service";
import { CommonController } from "./modules/common/common.controller";
import { UserRepository } from "./modules/user/user.repository";
import { UserService } from "./modules/user/user.service";
import { UserController } from "./modules/user/user.controller";
import { ScriptureRepository } from "./modules/scripture/scripture.repository";
import { ScriptureService } from "./modules/scripture/scripture.service";
import { ScriptureController } from "./modules/scripture/scripture.controller";
import { AuthMiddleware } from "./middlewares/auth.middleware";
import { AuthRepository } from "./modules/auth/auth.repository";
import { AuthService } from "./modules/auth/auth.service";
import { AuthController } from "./modules/auth/auth.controller";

export const hashUtils = new HashUtils();
export const jwtUtils = new JwtUtils();
export const mailer = new Mailer();

export const commonRepository = new CommonRepository();

export const userRepository = new UserRepository();
export const userService = new UserService(userRepository, hashUtils, mailer);
export const userController = new UserController(userService);
export const scriptureRepository = new ScriptureRepository();
export const scriptureService = new ScriptureService(scriptureRepository);
export const scriptureController = new ScriptureController(scriptureService);

export const authRepo = new AuthRepository();
export const authService = new AuthService(
  authRepo,
  userRepository,
  hashUtils,
  jwtUtils,
  mailer
);
export const authMiddleware = new AuthMiddleware(jwtUtils, userRepository);
export const authController = new AuthController(authService);

export const commonService = new CommonService(commonRepository);
export const commonController = new CommonController(commonService, commonRepository);
