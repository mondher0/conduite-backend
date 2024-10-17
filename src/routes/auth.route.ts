import { Router } from "express";
import { login, register } from "../controllers/auth.controller";
import authenticationMiddleware from "../middlewares/auth.middleware";

const router: Router = Router();

router.route("/register").post(register);
router.route("/login").post(login);

export default router;
